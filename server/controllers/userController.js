const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Contact} = require('../models/models')
const nodemailer = require("nodemailer");
const uuid = require('uuid');
const path = require("path");
const fs = require("fs");

const generateJwt = (id, email, username, role) => {
    return jwt.sign(
        {id, email, username, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

const confirmation = async (email, userId, link) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        }
    })

    jwt.sign({userId}, process.env.EMAIL_SECRET, {expiresIn: '1d'},
        (err, emailToken) => {
            transporter.sendMail({
                from: process.env.GMAIL_USER,
                to: email,
                subject: 'Активация аккаунта на FLOG ' + process.env.CLIENT_URL,
                text: '',
                html:
                    `
                    <div>
    <td align="center" valign="top" style="padding:0;Margin:0;width:530px">
        <table cellpadding="0" cellspacing="0" width="100%"
            role="presentation"
            <tr style="border-collapse:collapse">
                <td align="center" style="padding:0;Margin:0"><p>
                    Подтвердите регистрацию на FLOG</p>
                </td>
            </tr>
        </table>
    </td>
    <td valign="top" align="center" style="padding:0;Margin:0;width:530px">
        <table width="100%" cellspacing="0" cellpadding="0"
               role="presentation"
            <tr style="border-collapse:collapse">
                <td align="center"
                    style="padding:0;Margin:0;padding-bottom:15px;padding-top:30px">
                    <span class="es-button-border"
                            style="border-style:solid;border-color:transparent;background:#0d6936;border-width:0px;display:inline-block;border-radius:5px;width:auto">
                            <a
                            href="${link}"
                            class="es-button" target="_blank"
                            style="text-decoration:none;color:#ffffff;font-size:18px;display:inline-block;background:#0d6936;border-radius:5px;width:auto;text-align:center;padding:15px 30px;border-color:#0d6936"
                            >
                            Подтвердить
                        </a>
                    </span>
                </td>
            </tr>
        </table>
    </td>
    <td align="center" valign="top" style="padding:0;Margin:0;width:530px">
        <table cellpadding="0" cellspacing="0" width="100%"
               role="presentation"
            <tr style="border-collapse:collapse">
                <td align="center" style="padding:0;Margin:0"><p
                        style="line-height:23px;color:#696969;font-size:15px">
                    Если вы не регистрировались, проигнорируйте это
                    письмо</p>
                </td>
            </tr>
        </table>
    </td>
</div>              
            `
            })
        })
}

class UserController {
    async registration(req, res, next) {
        const {email, password, username, role} = req.body
        if (!email) {
            return next(ApiError.badRequest('Некорректный email'))
        }
        if (!password) {
            return next(ApiError.badRequest('Некорректный пароль'))
        }
        if (!username) {
            return next(ApiError.badRequest('Пожалуйста введите свой никнейм'))
        }

        let domain = email.split('@')[1]
        if (domain !== "g.nsu.ru") {
            return next(ApiError.badRequest('Почта не пренадлежит домену НГУ'))
        }

        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }

        const hashPassword = await bcrypt.hash(password, 5)
        const activationLink = uuid.v4()
        const user = await User.create({email, username, role, password: hashPassword, activationLink})

        await Contact.create({
            name: "Почта",
            contact: email,
            userId: user.id
        });

        await confirmation(user.email, user.id, `${process.env.API_URL}/api/user/activate/${activationLink}`)

        // const token = generateJwt(user.id, user.email, user.username, user.role)
        return res.json({message: "Пользователь успешно зарегистрирован"})
    }

    async sendConfirmationMail(req, res, next) {
        const {email} = req.body

        if (!email) {
            return next(ApiError.badRequest('Некорректный email'))
        }

        const user = await User.findOne({where: {email}})

        if (!user) {
            return next(ApiError.badRequest("Пользователь не найден"))
        }

        if (user.confirmed) {
            return next(ApiError.badRequest("Пользователь уже подтверждён"))
        }

        const activationLink = uuid.v4()

        user.activationLink = activationLink
        user.save()

        await confirmation(user.email, user.id, `${process.env.API_URL}/api/user/activate/${activationLink}`)
        return res.json({message: "Письмо отправлено"})
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link
            const user = await User.findOne({where: {activationLink}})
            if (!user) {
                return next(ApiError.badRequest('Некорректная ссылка активации'))
            }
            user.confirmed = true
            await user.save()

            const token = generateJwt(user.id, user.email, user.username, user.role)

            return res.redirect(process.env.CLIENT_URL + '/activation/' + token)
        } catch(e) {
            next(e)
        }
    }

    async login(req, res, next) {
        const {email, password} = req.body

        if (!email || !password) {
            return next(ApiError.badRequest("Не указаны почта и пароль"))
        }

        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        if (!user.confirmed) {
            return next(ApiError.badRequest('Подтвердите аккаунт'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.badRequest('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.username, user.role)
        return res.json({token})
    }

    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.email, req.user.username, req.user.role)
        return res.json({token})
    }

    async getUser(req, res, next) {
        const {id} = req.params

        if (isNaN(id)) {
            return next(ApiError.badRequest('id должен быть числом'))
        }

        const user = await User.findOne({
            where: {id},
            // include: [{model: Contact, as: 'contact'}] // возможно не возвращать
        })

        return res.json(user)
    }

    async setRole(req, res, next) {
        const {id} = req.params
        const {role} = req.body

        if (isNaN(id)) {
            return next(ApiError.badRequest('id должен быть числом'))
        }

        if (!role) {
            return next(ApiError.badRequest("Укажите роль"))
        }

        const user = await User.findOne({
            where: {id}
        })

        if (user) {
            user.role = role
            await user.save()
        }

        return res.json(user)
    }

    async getCurrentUserId(req, res, next) {
        const token = req.headers.authorization.split(' ')[1]
        const userAuth = jwt.verify(token, process.env.SECRET_KEY)

        const user = await User.findOne({
            where: {id: userAuth.id}
        })

        if (!user) {
            return next(ApiError.badRequest('Пользователь не найден'))
        }

        return res.json(user)
    }

    async updateData(req, res, next) {
        const {username} = req.body

        let newImage
        if (req.files) {
            const {image} = req.files
            newImage = image
        }

        const token = req.headers.authorization.split(' ')[1]
        const userAuth = jwt.verify(token, process.env.SECRET_KEY)

        const user = await User.findOne({where: userAuth.id})

        if (!user) {
            return next(ApiError.badRequest("Пользователя с таким id не существует"))
        }

        if (newImage) {

            if (user.image) {
                fs.unlinkSync(path.resolve(__dirname, "..", "static", user.image))
            }

            let fileName = uuid.v4() + ".jpg"
            await newImage.mv(path.resolve(__dirname, "..", "static", fileName))
            user.image = fileName
            await user.save()
        }

        if (username) {
            user.username = username
            await user.save()
        }

        return res.json(user)
    }

    async addContacts(req, res) {
        let {contacts} = req.body

        const token = req.headers.authorization.split(' ')[1]
        const user = jwt.verify(token, process.env.SECRET_KEY)

        if (contacts) {
            for (const c of contacts) {
                await Contact.create({
                    name: c.name,
                    contact: c.contact,
                    userId: user.id
                });
            }
        }

        return res.json(contacts)
    }

    async getContacts(req, res, next) {
        const {id} = req.params

        if (isNaN(id)) {
            return next(ApiError.badRequest('id должен быть числом'))
        }

        const contacts = await Contact.findAll({
            where: {userId: id}
        })

        return res.json(contacts)
    }

    async deleteContacts(req, res, next) {
        const {id} = req.params

        if (isNaN(id)) {
            return next(ApiError.badRequest('id должен быть числом'))
        }

        const contacts = await Contact.findAll({
            where: {userId: id}
        })
        if (contacts) {
            contacts.forEach(c => c.destroy())
        }
        return res.json(contacts)
    }

    async updateContacts(req, res, next) {
        let {contacts} = req.body

        const token = req.headers.authorization.split(' ')[1]
        const user = jwt.verify(token, process.env.SECRET_KEY)

        if (!user) {
            return next(ApiError.internal("Не удалось получить пользователя"))
        }

        if (contacts) {

            const oldContacts = await Contact.findAll({
                where: {userId: user.id}
            })
            if (oldContacts) {
                oldContacts.forEach(c => c.destroy())
            }

            for (const c of contacts) {
                await Contact.create({
                    name: c.name,
                    contact: c.contact,
                    userId: user.id
                });
            }
        }

        return res.json(contacts)
    }

    async checkPassword(req, res, next) {
        const {password} = req.body

        if (!password) {
            return next(ApiError.badRequest("Не указан пароль"))
        }

        const token = req.headers.authorization.split(' ')[1]
        const userAuth = jwt.verify(token, process.env.SECRET_KEY)

        const user = await User.findOne({where: userAuth.id})

        if (!user) {
            return next(ApiError.badRequest("Пользоваетель не найден"))
        }

        const comparePassword = bcrypt.compareSync(password, user.password)

        return res.json(comparePassword)
    }

    async updatePassword(req, res, next) {
        const {password} = req.body

        if (!password) {
            return next(ApiError.badRequest("Не указан пароль"))
        }

        const token = req.headers.authorization.split(' ')[1]
        const userAuth = jwt.verify(token, process.env.SECRET_KEY)

        const user = await User.findOne({where: userAuth.id})

        if (!user) {
            return next(ApiError.badRequest("Пользоваетель не найден"))
        }

        user.password = await bcrypt.hash(password, 5)
        await user.save()

        return res.json(user)
    }
}

module.exports = new UserController()
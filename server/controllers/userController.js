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

const confirmation = async (username, email, userId, link) => {
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
                subject: username + ', подтвердите аккаунт на FLOG!',
                text: '',
                html:
                    `
<div 
    style="height: 200px;width: 450px; 
    text-align: center;background-image: 
    url(https://i.ibb.co/9gCVYW3/mail.png)"
>
    <p 
        style="font-family: Georgia, 'Times New Roman', Times, serif;
            padding-top: 10px;"
    >
        Подтвердите, пожалуйста, регистрацию на FLOG
    </p>
    <a href="${link}">
        <button 
            style="background-color: #0D6936;
            font-family: Georgia, 'Times New Roman', Times, serif;
            color: #fff;
            font-weight: 400;
            font-size: 16px;
            padding: 10px 20px;
            border: none;
            border-radius: 8px;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
            transition: all 0.3s ease-in-out;
            cursor: pointer;
            margin-top: 10px;"
        >
            Подтвердить
        </button>
    </a>
    <p
        style="font-family: Georgia, 'Times New Roman', Times, serif;
        margin-top: 30px;"
    >
        FLOG - Friendly Local Offers and Goods</p>
    <p 
        style="font-family: 'Courier New', Courier, monospace; 
        color: #000000; 
        font-size: small;
        margin-top: 35px;"
    >
        Если вы не регистрировались, проигнорируйте это письмо
    </p>
</div>
                    `
            })
        })
}

const checkImage = (image) => {
    const types = {
        png: "89504e47",
        gif: "47494638",
        jpg1: "ffd8ffe1",
        jpg2: "ffd8ffdb",
        jpg3: "ffd8ffe0",
        jpg4: "ffd8ffee"
    }

    const hex = image.data.toString('hex', 0, 4)

    return hex === types.png || hex === types.gif ||
           hex === types.jpg1 || hex === types.jpg2 ||
           hex === types.jpg3 || hex === types.jpg4
}

const getExtension = (filename) => {
    return "." + filename.name.split('.').pop()
}

class UserController {
    async registration(req, res, next) {
        const {email, password, username, role} = req.body
        if (!email) {
            return next(ApiError.badRequest('Пожалуйста введите email'))
        }
        if (!password) {
            return next(ApiError.badRequest('Пожалуйста введите пароль'))
        }
        if (!username) {
            return next(ApiError.badRequest('Пожалуйста введите свой никнейм'))
        }

        if (!email.includes("@")) {
            return next(ApiError.badRequest('Некорректный email'))
        }

        let domain = email.split('@')[1]
        if (!domain.endsWith("nsu.ru")) {
            return next(ApiError.badRequest('Почта не принадлежит домену НГУ'))
        }

        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }

        const hashPassword = await bcrypt.hash(password, 5)
        const activationLink = uuid.v4()

        const image = "FrogZero.svg"

        const user = await User.create({email, username, role, password: hashPassword, activationLink, image})

        await Contact.create({
            name: "Почта",
            contact: email,
            userId: user.id
        });

        await confirmation(user.username, user.email, user.id, `${process.env.API_URL}/api/user/activate/${activationLink}`)

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

        await confirmation(user.username, user.email, user.id, `${process.env.API_URL}/api/user/activate/${activationLink}`)
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

            if (!checkImage(newImage)) {
                return next(ApiError.badRequest("Неверное расширение файла, должно быть jpg/jpeg, png, gif"))
            }

            if (user.image) {
                if (user.image !== "FrogZero.svg") {
                    fs.unlinkSync(path.resolve(__dirname, "..", "static", user.image))
                }
            }

            let fileName = uuid.v4() + getExtension(newImage)
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
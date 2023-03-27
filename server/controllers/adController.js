const uuid = require('uuid')
const path = require('path')
const {Ad, Info, Price} = require('../models/models')
const ApiError = require('../error/ApiError')
const jwt = require("jsonwebtoken");

class AdController {
    async create(req, res, next) {
        try {
            let {name, description, address, subSubCategoryId, price, info} = req.body
            console.log(req.body)
            const {image} = req.files
            let fileName = uuid.v4() + ".jpg"
            await image.mv(path.resolve(__dirname, "..", "static", fileName))

            if (!price) {
                return next(ApiError.badRequest("Укажите цену"))
            }
            price = JSON.parse(price)
            const priceRes = await Price.create({
                type: price.type,
                start: price.start,
                end: price.end
            })

            const token = req.headers.authorization.split(' ')[1]
            const user = jwt.verify(token, process.env.SECRET_KEY)
            const userId = user.id

            const priceId = priceRes.id
            const ad = await Ad.create({name, description, address, userId, priceId, subSubCategoryId, image: fileName})

            if (info) {
                info = JSON.parse(info)
                for (const i of info) {
                    await Info.create({
                        name: i.name,
                        description: i.description,
                        adId: ad.id
                    });
                }
            }
            return res.json(ad)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {categoryId, subCategoryId, subSubCategoryId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let ads;
        if (subSubCategoryId) {
            ads = await Ad.findAndCountAll({
                where: {subSubCategoryId},
                limit, offset
            })
        } else if (subCategoryId) {
            ads = await Ad.findAndCountAll({
                where: {subCategoryId},
                limit, offset
            })
        } else if (categoryId) {
            ads = await Ad.findAndCountAll({
                where: {categoryId},
                limit, offset
            })
        } else {
            ads = await Ad.findAndCountAll({
                limit, offset
            })
        }
        return res.json(ads)
    }

    async getOne(req, res) {
        const {id} = req.params
        const ad = await Ad.findOne({
                where: {id},
                include: [{model: Info, as: 'info'}]
            },
        )
        return res.json(ad)
    }

    async getAds(req, res) {
        const {id} = req.params
        const ads = await Ad.findAndCountAll({
            where: {userId: id}
        })

        return res.json(ads)
    }

    async delete(req, res, next) {
        const {id} = req.params

        const ad = await Ad.findOne({
            where: {id},
            include: [{model: Info, as: 'info'}]
        })
        if (ad) {
            const token = req.headers.authorization.split(' ')[1]
            const user = jwt.verify(token, process.env.SECRET_KEY)
            if (ad.userId !== user.id && user.role !== 'ADMIN' && user.role !== 'MODERATOR') {
                next(ApiError.badRequest('Вы не можете изменить объявление другого пользователя'))
            }

            const oldInfo = await Info.findAll({where: {adId: ad.id}})
            if (oldInfo) {
                oldInfo.forEach(i => i.destroy())
            }

            await ad.destroy()
        }

        return res.json(ad)
    }

    async update(req, res, next) {
        try {
            let {name, description, address, subSubCategoryId, price, info} = req.body
            const {image} = req.files
            let fileName = uuid.v4() + ".jpg"
            await image.mv(path.resolve(__dirname, "..", "static", fileName))

            const {id} = req.params
            const ad = await Ad.findOne({
                    where: {id},
                    include: [{model: Info, as: 'info'}]
                },
            )

            const token = req.headers.authorization.split(' ')[1]
            const user = jwt.verify(token, process.env.SECRET_KEY)

            if (ad.userId !== user.id && user.role !== 'ADMIN' && user.role !== 'MODERATOR') {
                next(ApiError.badRequest('Вы не можете изменить объявление другого пользователя'))
            }

            ad.name = name
            ad.description = description
            ad.address = address
            ad.subSubCategoryId = subSubCategoryId

            if (price) {
                price = JSON.parse(price)
                const priceId = ad.priceId
                const priceRes = await Price.findOne({
                    where: {id: priceId}
                })
                priceRes.type = price.type
                priceRes.start = price.start
                priceRes.end = price.end
                await priceRes.save()
            }

            await ad.save()

            const oldInfo = await Info.findAll({where: {adId: ad.id}})
            if (oldInfo) {
                oldInfo.forEach(i => i.destroy())
            }
            if (info) {
                info = JSON.parse(info)
                for (const i of info) {
                    await Info.create({
                        name: i.name,
                        description: i.description,
                        adId: ad.id
                    });
                }
            }
            return res.json(ad)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new AdController()
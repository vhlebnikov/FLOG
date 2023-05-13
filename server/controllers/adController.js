const uuid = require('uuid')
const path = require('path')
const {Ad, Info, Price, SubSubCategory, SubCategory, Image, Comment} = require('../models/models')
const ApiError = require('../error/ApiError')
const jwt = require("jsonwebtoken");
const fs = require('fs')

function isIterable(obj) {
    // checks for null and undefined
    if (obj == null) {
        return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
}

class AdController {
    async create(req, res, next) {
        try {
            let {name, description, address, status, subSubCategoryId, price, info} = req.body
            let {image} = req.files

            if (!price) {
                return next(ApiError.badRequest("Укажите цену"))
            }
            if (!name) {
                return next(ApiError.badRequest("Укажите название объявления"))
            }
            if (!image) {
                return next(ApiError.badRequest("Загрузите фотографии"))
            }
            if (!subSubCategoryId) {
                return next(ApiError.badRequest("Укажите категории"))
            }
            if (!status) {
                return next(ApiError.badRequest("Должен быть присвоен статус объявления"))
            }

            price = JSON.parse(price)
            const priceRes = await Price.create({
                type: price.type,
                start: price.start,
                end: price.end
            })
            const priceId = priceRes.id

            const token = req.headers.authorization.split(' ')[1]
            const user = jwt.verify(token, process.env.SECRET_KEY)
            const userId = user.id

            const ad = await Ad.create({name, description, address, userId, priceId, status, subSubCategoryId})

            if (isIterable(image)) {
                for (const i of image) {
                    let fileName = uuid.v4() + ".jpg"
                    await i.mv(path.resolve(__dirname, "..", "static", fileName))
                    await Image.create({
                        image: fileName,
                        adId: ad.id
                    });
                }
            } else {
                let fileName = uuid.v4() + ".jpg"
                await image.mv(path.resolve(__dirname, "..", "static", fileName))
                await Image.create({
                    image: fileName,
                    adId: ad.id
                });
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

    async getAll(req, res, next) {
        let {categoryId, subCategoryId, subSubCategoryId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        if (page <= 0 || limit <= 0) {
            return next(ApiError.badRequest('Неверные данные запроса'))
        }
        let offset = page * limit - limit
        let ads;
        let c = 0;
        if (subSubCategoryId) {
            ads = await Ad.findAndCountAll({
                where: {subSubCategoryId: subSubCategoryId},
                include: [{model: Image, as: 'image'}],
                distinct: true,
                limit, offset
            })
        } else if (subCategoryId) {
            const {rows} = await SubSubCategory.findAndCountAll({
                where: {subCategoryId: subCategoryId}
            })

            for (const ssc of rows) {
                let {count, rows} = await Ad.findAndCountAll({
                    where: {subSubCategoryId: ssc.id},
                    include: [{model: Image, as: 'image'}],
                    distinct: true
                });
                if (!ads) {
                    ads = rows
                } else {
                    ads = rows.concat(ads)
                }
                c += count
            }
            let pagAds = []
            if (ads) {
                pagAds = ads.slice(offset, Number(offset) + Number(limit))
            }
            return res.json({count: c, rows: pagAds})
        } else if (categoryId) {
            const {rows} = await SubCategory.findAndCountAll({
                where: {categoryId: categoryId}
            })

            for (const sc of rows) {
                const {rows} = await SubSubCategory.findAndCountAll({
                    where: {subCategoryId: sc.id}
                })

                for (const ssc of rows) {
                    let {count, rows} = await Ad.findAndCountAll({
                        where: {subSubCategoryId: ssc.id},
                        include: [{model: Image, as: 'image'}],
                        distinct: true
                    });
                    if (!ads) {
                        ads = rows
                    } else {
                        ads = rows.concat(ads)
                    }
                    c += count
                }
            }
            let pagAds = []
            if (ads) {
                pagAds = ads.slice(offset, Number(offset) + Number(limit))
            }
            return res.json({count: c, rows: pagAds})
        } else {
            ads = await Ad.findAndCountAll({
                include: [{model: Image, as: 'image'}],
                distinct: true,
                limit, offset
            })
        }
        return res.json(ads)
    }

    async getPrice(req, res, next) {
        const {id} = req.params

        if (isNaN(id)) {
            return next(ApiError.badRequest('id должен быть числом'))
        }

        const price = await Price.findOne({
            where: {id}
        })

        return res.json(price)
    }

    async getOne(req, res, next) {
        const {id} = req.params

        if (isNaN(id)) {
            return next(ApiError.badRequest('id должен быть числом'))
        }

        const ad = await Ad.findOne({
                where: {id},
                include: [{model: Info, as: 'info'}, {model: Image, as: 'image'}],
            },
        )

        return res.json(ad)
    }

    async getAds(req, res, next) {
        const {id} = req.params

        if (isNaN(id)) {
            return next(ApiError.badRequest('id должен быть числом'))
        }

        const ads = await Ad.findAndCountAll({
            where: {userId: id},
            include: [{model: Image, as: 'image'}],
            distinct: true
        })

        return res.json(ads)
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params

            if (isNaN(id)) {
                return next(ApiError.badRequest('id должен быть числом'))
            }

            const ad = await Ad.findOne({
                where: {id},
                include: [{model: Info, as: 'info'}]
            })
            if (!ad) {
                return next(ApiError.badRequest('Объявление с таким id не существует'))
            }

            const token = req.headers.authorization.split(' ')[1]
            const user = jwt.verify(token, process.env.SECRET_KEY)
            if (ad.userId !== user.id && user.role !== 'ADMIN' && user.role !== 'MODERATOR') {
                return next(ApiError.badRequest('Вы не можете удалить объявление другого пользователя'))
            }

            const price = await Price.findOne({where: {id: ad.priceId}})
            if (price) {
                price.destroy()
            }

            const oldInfo = await Info.findAll({where: {adId: ad.id}})
            if (oldInfo) {
                oldInfo.forEach(i => i.destroy())
            }

            const oldImage = await Image.findAll({where: {adId: ad.id}})
            if (oldImage) {
                oldImage.forEach(i => {
                    fs.unlinkSync(path.resolve(__dirname, "..", "static", i.image))
                    i.destroy()
                })
            }

            const comments = await Comment.findAll({
                where: {adId: id}
            })
            if (comments) {
                comments.forEach(i => i.destroy())
            }

            await ad.destroy()

            return res.json(ad)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            let {name, description, address, status, subSubCategoryId, price, info} = req.body

            let newImage
            if (req.files) {
                const {image} = req.files
                newImage = image
            }

            const {id} = req.params

            if (isNaN(id)) {
                return next(ApiError.badRequest('id должен быть числом'))
            }

            let ad = await Ad.findOne({
                    where: {id: id},
                }
            )

            if (!ad) {
                next(ApiError.badRequest('Такого объявления не существует'))
            }
            const token = req.headers.authorization.split(' ')[1]
            const user = jwt.verify(token, process.env.SECRET_KEY)

            if (ad.userId !== user.id && user.role !== 'ADMIN' && user.role !== 'MODERATOR') {
                next(ApiError.badRequest('Вы не можете изменить объявление другого пользователя'))
            }

            if (name) {
                ad.name = name
            }
            if (description) {
                ad.description = description
            }
            if (address) {
                ad.address = address
            }
            if (subSubCategoryId) {
                ad.subSubCategoryId = subSubCategoryId
            }
            if (status) {
                ad.status = status
            }

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

            if (newImage) {
                const oldImage = await Image.findAll({where: {adId: ad.id}})
                if (oldImage) {
                    oldImage.forEach(i => {
                        fs.unlinkSync(path.resolve(__dirname, "..", "static", i.image))
                        i.destroy()
                    })
                }

                if (isIterable(newImage)) {
                    for (const i of newImage) {
                        let fileName = uuid.v4() + ".jpg"
                        await i.mv(path.resolve(__dirname, "..", "static", fileName))
                        await Image.create({
                            image: fileName,
                            adId: ad.id
                        });
                    }
                } else {
                    let fileName = uuid.v4() + ".jpg"
                    await newImage.mv(path.resolve(__dirname, "..", "static", fileName))
                    await Image.create({
                        image: fileName,
                        adId: ad.id
                    });
                }
            }

            if (info) {
                const oldInfo = await Info.findAll({where: {adId: ad.id}})
                if (oldInfo) {
                    oldInfo.forEach(i => i.destroy())
                }

                info = JSON.parse(info)
                for (const i of info) {
                    await Info.create({
                        name: i.name,
                        description: i.description,
                        adId: ad.id
                    });
                }
            }

            ad = await Ad.findOne({
                    where: {id: id},
                    include: [{model: Info, as: 'info'}, {model: Image, as: 'image'}]
                }
            )

            return res.json(ad)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new AdController()
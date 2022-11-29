const uuid = require('uuid')
const path = require('path');
const {Ad, AdInfo} = require('../models/models')
const ApiError = require('../error/ApiError');

class AdController {
    async create(req, res, next) {
        try {
            let {name, price, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const ad = await Ad.create({name, price, typeId, img: fileName});

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    AdInfo.create({
                        title: i.title,
                        description: i.description,
                        adId: ad.id
                    })
                )
            }

            return res.json(ad)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
        let {typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let ads;
        if (typeId) {
            ads = await Ad.findAndCountAll({where:{typeId}, limit, offset})
        } else {
            ads = await Ad.findAndCountAll({limit, offset})
        }
        return res.json(ads)
    }

    async getOne(req, res) {
        const {id} = req.params
        const ad = await Ad.findOne(
            {
                where: {id},
                include: [{model: AdInfo, as: 'info'}]
            },
        )
        return res.json(ad)
    }
}

module.exports = new AdController()
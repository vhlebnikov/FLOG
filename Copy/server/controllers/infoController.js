const {Info} = require('../models/models')
const ApiError = require("../error/ApiError");

class InfoController {
    // getInfo for {id} ad
    async getInfo(req, res, next) {
        const {id} = req.params

        if (isNaN(id)) {
            return next(ApiError.badRequest('id должен быть числом'))
        }

        const info = await Info.findAll({
            where: {adId: id}
        })

        return res.json(info)
    }
}

module.exports = new InfoController()
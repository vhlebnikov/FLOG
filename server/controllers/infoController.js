const {Info} = require('../models/models')

class InfoController {
    // getInfo for {id} ad
    async getInfo(req, res) {
        const {id} = req.params
        const info = await Info.findAll({
            where: {adId: id}
        })

        return res.json(info)
    }
}

module.exports = new InfoController()
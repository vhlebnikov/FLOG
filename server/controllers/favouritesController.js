const { Ad, FavouritesAd, Favourites } = require("../models/models")

class FavouritesController {
    async addToFavourites(req,res,next){
        const user = req.user
        const {adId} = req.body
        const favourites = await FavouritesAd.create({favouritesId : user.id, adId : adId})
        return res.json(favourites)
    }

    async getFavouritesUser(req,res){
        const {id} = req.user
        const favourites = await FavouritesAd.findAll({include: {
                model: Ad
            }, where: {favouritesId: id}})

        return res.json(favourites)
    }

}

module.exports = new FavouritesController()
const Router = require('express')
const router = new Router()
const adRouter = require('./adRouter')
const userRouter = require('./userRouter')
const typeRouter = require('./typeRouter')
const favouritesRouter = require('./favoutiresRouter')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/ad', adRouter)
router.use('/favourites', favouritesRouter)

module.exports = router
const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const adRouter = require('./adRouter')
const infoRouter = require('./infoRouter')
const categoryRouter = require('./categoryRouter')
const commentRouter = require('./commentRouter')

router.use('/user', userRouter)
router.use('/ad', adRouter)
router.use('/info', infoRouter)
router.use('/category', categoryRouter)
router.use('/comment', commentRouter)

module.exports = router
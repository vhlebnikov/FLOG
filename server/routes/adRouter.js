const Router = require('express')
const router = new Router()
const adController = require('../controllers/adController')
const authMiddleWare = require('../middleware/authMiddleware')

router.get('/', adController.getAll)
router.get('/price/:id', adController.getPrice)
router.get('/user/:id', adController.getAds)
router.get('/:id', adController.getOne)

router.post('/', authMiddleWare, adController.create)

router.put('/:id', authMiddleWare, adController.update)

router.delete('/:id', authMiddleWare, adController.delete)

module.exports = router
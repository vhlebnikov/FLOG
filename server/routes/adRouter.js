const Router = require('express')
const router = new Router()
const adController = require('../controllers/adController')
const authMiddleWare = require('../middleware/authMiddleware')

router.get('/', adController.getAll)
router.get('/:id', adController.getOne)
router.get('/user/:id', adController.getAds)
router.post('/', authMiddleWare, adController.create)
router.put('/:id', authMiddleWare, adController.update)
router.delete('/:id', authMiddleWare, adController.delete)

module.exports = router
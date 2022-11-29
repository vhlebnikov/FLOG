const Router = require('express')
const router = new Router()
const adController = require('../controllers/adController')

router.post('/', adController.create)
router.get('/', adController.getAll)
router.get('/:id', adController.getOne)

module.exports = router
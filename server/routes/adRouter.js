const Router = require('express')
const router = new Router()
const adController = require('../controllers/adController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', adController.create)
router.get('/', adController.getAll)
router.get('/:id', adController.getOne)
router.delete('/:id', checkRole('ADMIN'), adController.deleteOne)

module.exports = router
const Router = require('express')
const router = new Router()
const tagController = require('../controllers/tagController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), tagController.create)
router.get('/', tagController.getAll)

module.exports = router
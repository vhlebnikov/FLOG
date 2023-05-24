const Router = require('express')
const router = new Router()
const categoryController = require('../controllers/categoryController')
const checkRole = require('../middleware/checkRoleMiddleware')

// parentId = 0 - для корней
router.post('/:id', checkRole('ADMIN'), categoryController.addCategory)

router.get('/route/:id', categoryController.getCategoryRoute)
router.get('/:id', categoryController.getCategory)

router.put('/:id', checkRole('ADMIN'), categoryController.updateCategory)

router.delete('/:id', checkRole('ADMIN'), categoryController.deleteCategory)

module.exports = router
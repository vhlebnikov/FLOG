const Router = require('express')
const router = new Router()
const categoryController = require('../controllers/categoryController')
const checkRole = require('../middleware/checkRoleMiddleware')

// id в post и get (3 нижних) запросах - id родителя
router.post('/cat', checkRole('ADMIN'), categoryController.addCategory)
router.post('/sub/:id', checkRole('ADMIN'), categoryController.addSubCategory)
router.post('/subsub/:id', checkRole('ADMIN'), categoryController.addSubSubCategory)

router.delete('/cat/:id', checkRole('ADMIN'), categoryController.deleteCategory)
router.delete('/sub/:id', checkRole('ADMIN'), categoryController.deleteSubCategory)
router.delete('/subsub/:id', checkRole('ADMIN'), categoryController.deleteSubSubCategory)

router.put('/cat/:id', checkRole('ADMIN'), categoryController.updateCategory)
router.put('/sub/:id', checkRole('ADMIN'), categoryController.updateSubCategory)
router.put('/subsub/:id', checkRole('ADMIN'), categoryController.updateSubSubCategory)

// получение пути категорий по подподкатегории
router.get('/route/:id', categoryController.getCategoryRoute)

router.get('/cat', categoryController.getCategory)
router.get('/sub/:id', categoryController.getSubCategory)
router.get('/subsub/:id', categoryController.getSubSubCategory)

module.exports = router
const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/activate/:link', userController.activate)
router.get('/auth', authMiddleware, userController.check)
router.get('/:id', userController.getUser)

router.post('/contacts', authMiddleware, userController.addContacts)
router.get('/contacts/:id', authMiddleware, userController.getContacts)
router.put('/contacts', authMiddleware, userController.updateContacts)
router.delete('/contacts', authMiddleware, userController.deleteContacts)

module.exports = router
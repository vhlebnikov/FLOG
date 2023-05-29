const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/confirm', userController.sendConfirmationMail)
router.post('/contacts', authMiddleware, userController.addContacts)
router.post('/role/:id', checkRole('ADMIN'), userController.setRole)
router.post('/password', authMiddleware, userController.checkPassword)

router.get('/activate/:link', userController.activate)
router.get('/current', authMiddleware, userController.getCurrentUserId)
router.get('/auth', authMiddleware, userController.check)
router.get('/users', checkRole('ADMIN'), userController.getAllUsers)
router.get('/contacts/:id', authMiddleware, userController.getContacts)
router.get('/:id', userController.getUser)

router.put('/data', authMiddleware, userController.updateData)
router.put('/contacts', authMiddleware, userController.updateContacts)
router.put('/password', authMiddleware, userController.updatePassword)

router.delete('/contacts/:id', checkRole('ADMIN'), userController.deleteContacts)


module.exports = router
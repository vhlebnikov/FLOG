const Router = require('express')
const router = new Router()
const commentController = require('../controllers/commentController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/:id', authMiddleware, commentController.addComment) // adds comment for ad with :id

router.get('/:id', commentController.getAllComments) // gets all comments for ad with certain :id

router.delete('/:id', authMiddleware, commentController.deleteComment) // deletes comment by id



module.exports = router
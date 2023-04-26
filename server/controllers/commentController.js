const {Ad, User, Comment} = require("../models/models");
const ApiError = require("../error/ApiError");
const jwt = require("jsonwebtoken");

class CommentController {
    async addComment(req, res, next) {
        const {id} = req.params
        const {text} = req.body

        if (isNaN(id)) {
            return next(ApiError.badRequest('id должен быть числом'))
        }

        if (!text) {
            return next(ApiError.badRequest("Введите комментарий"))
        }

        const ad = await Ad.findOne({where: {id}})
        if (!ad) {
            return next(ApiError.badRequest('Нет объявления с таким id'))
        }

        const token = req.headers.authorization.split(' ')[1]
        const user = jwt.verify(token, process.env.SECRET_KEY)

        const comment = await Comment.create({text, userId: user.id, adId: id})

        return res.json(comment)
    }

    async getAllComments(req, res, next) {
        const {id} = req.params

        if (isNaN(id)) {
            return next(ApiError.badRequest('id должен быть числом'))
        }

        const comments = await Comment.findAndCountAll({where: {adId: id}})

        return res.json(comments)
    }

    async deleteComment(req, res, next) {
        const {id} = req.params

        if (isNaN(id)) {
            return next(ApiError.badRequest('id должен быть числом'))
        }

        const token = req.headers.authorization.split(' ')[1]
        const user = jwt.verify(token, process.env.SECRET_KEY)

        const comment = await Comment.findOne({where: {id}})
        if (!comment) {
            return next(ApiError.badRequest('Комментарий с таким id не найден'))
        }

        if (comment.userId !== user.id && user.role !== 'ADMIN' && user.role !== 'MODERATOR') {
            return next(ApiError.badRequest('Вы не можете удалить комментарий другого пользователя'))
        }

        comment.destroy()

        return res.json(comment)
    }
}

module.exports = new CommentController()
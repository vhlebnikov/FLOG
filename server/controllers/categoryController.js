const {Category} = require('../models/models')
const ApiError = require("../error/ApiError")

const findChildrenAndDestroy = async (id) => {
    const categories = await Category.findAll({
        where: {parentId: id}
    })

    categories.forEach(c => {
        findChildrenAndDestroy(c.id)
        c.destroy()
    })
}

class CategoryController {
    async addCategory(req, res, next) {
        const {id} = req.params
        const {name} = req.body

        if (isNaN(id)) {
            return next(ApiError.badRequest("id должен быть числом"))
        }

        if (!name) {
            return next(ApiError.badRequest("Укажите название категории"))
        }

        const category = await Category.create({
            name: name,
            parentId: id
        })

        return res.json(category)
    }

    async deleteCategory(req, res, next) {
        const {id} = req.params

        if (isNaN(id)) {
            return next(ApiError.badRequest("id должен быть числом"))
        }

        let category = await Category.findOne({
            where: {id: id}
        })

        try {
            await findChildrenAndDestroy(id)
            category.destroy()
        } catch (e) {
            return res.json(e)
        }

        return res.json(category)
    }

    async updateCategory(req, res, next) {
        const {id} = req.params
        const {name} = req.body

        if (isNaN(id)) {
            return next(ApiError.badRequest("id должен быть числом"))
        }

        if (!name) {
            return next(ApiError.badRequest("Укажите название категории"))
        }

        const category = await Category.findOne({
            where: {id: id}
        })

        if (category) {
            category.name = name
            await category.save()
        }

        return res.json(category)
    }

    async getCategoryRoute(req, res, next) {
        const {id} = req.params

        if (isNaN(id)) {
            return next(ApiError.badRequest("id должен быть числом"))
        }

        const route = []

        let category = await Category.findOne({
            where: {id: id}
        })

        if (!category) {
            return next(ApiError.badRequest("Такой категории не существует"))
        }

        route.push(category)

        while (category.parentId !== 0) {
            category = await Category.findOne({
                where: {id: category.parentId}
            })

            route.push(category)
        }

        route.reverse()

        return res.json(route)
    }

    async getCategory(req, res, next) {
        const {id} = req.params

        if (isNaN(id)) {
            return next(ApiError.badRequest("id должен быть числом"))
        }

        const categories = await Category.findAll({
            where: {parentId: id}
        })

        return res.json(categories)
    }
}

module.exports = new CategoryController()
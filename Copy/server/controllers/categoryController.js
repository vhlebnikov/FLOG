const {Category, SubCategory, SubSubCategory, Contact, Price, Info} = require('../models/models')
const ApiError = require("../error/ApiError");

class CategoryController {
    async addCategory(req, res, next) {
        const {category} = req.body
        try {
            if (category) {
                for (const c of category) {
                    await Category.create({
                        name: c.name
                    });
                }
            }

            return res.json(category)
        } catch (e) {
            return next(ApiError.badRequest('Такие категории уже есть'))
        }
    }

    async addSubCategory(req, res, next) {
        const {id} = req.params

        if (isNaN(id)) {
            return next(ApiError.badRequest('id должен быть числом'))
        }

        const category = await Category.findOne({
            where: {id}
        })

        const {subCategory} = req.body

        if (!category) {
            return next(ApiError.badRequest('Категория с таким id не найдена'))
        } else {
            if (subCategory) {
                for (const c of subCategory) {
                    await SubCategory.create({
                        name: c.name,
                        categoryId: category.id
                    })
                }
            }
        }

        return res.json(subCategory)
    }

    async addSubSubCategory(req, res, next) {
        const {id} = req.params

        if (isNaN(id)) {
            return next(ApiError.badRequest('id должен быть числом'))
        }

        const subCategory = await SubCategory.findOne({
            where: {id}
        })

        const {subSubCategory} = req.body
        if (!subCategory) {
            return next(ApiError.badRequest('Подкатегория с таким id не найдена'))
        } else {
            if (subSubCategory) {
                for (const c of subSubCategory) {
                    await SubSubCategory.create({
                        name: c.name,
                        subCategoryId: subCategory.id
                    })
                }
            }
        }

        return res.json(subSubCategory)
    }

    async deleteCategory(req, res, next) {
        const {id} = req.params

        if (isNaN(id)) {
            return next(ApiError.badRequest('id должен быть числом'))
        }

        const category = await Category.findOne({
            where: {id: id}
        })

        if (category) {
            const subCategories = await SubCategory.findAll({
                where: {categoryId: category.id}
            })

            if (subCategories) {
                for (const sc of subCategories) {
                    let subSubCategory = await SubSubCategory.findAll({
                        where: {subCategoryId: sc.id}
                    })

                    if (subSubCategory) {
                        subSubCategory.forEach(c => c.destroy())
                    }

                    await sc.destroy()
                }
            }
            await category.destroy()
        }

        return res.json(category)
    }

    async deleteSubCategory(req, res, next) {
        const {id} = req.params

        if (isNaN(id)) {
            return next(ApiError.badRequest('id должен быть числом'))
        }

        const subCategory = await SubCategory.findOne({
            where: {id: id}
        })
        if (subCategory) {
            const subSubCategories = await SubSubCategory.findAll({
                where: {subCategoryId: subCategory.id}
            })

            if (subSubCategories) {
                subSubCategories.forEach(c => c.destroy())
            }
            await subCategory.destroy()
        }

        return res.json(subCategory)
    }

    async deleteSubSubCategory(req, res, next) {
        const {id} = req.params

        if (isNaN(id)) {
            return next(ApiError.badRequest('id должен быть числом'))
        }

        const subSubCategory = await SubSubCategory.findOne({
            where: {id: id}
        })

        if (subSubCategory) {
            await subSubCategory.destroy()
        }

        return res.json(subSubCategory)
    }

    async updateCategory(req, res, next) {
        const {id} = req.params
        const {name} = req.body

        if (isNaN(id)) {
            return next(ApiError.badRequest('id должен быть числом'))
        }

        const category = await Category.findOne({
            where: {id: id}
        })

        if (!name) {
            return next(ApiError.badRequest('Не передано поле name'))
        }

        if (category) {
            try {
                category.name = name
                await category.save()
            } catch (e) {
                return next(ApiError.badRequest('Такое имя уже занято'))
            }
        }

        return res.json(category)
    }

    async updateSubCategory(req, res, next) {
        const {id} = req.params
        const {name} = req.body

        if (isNaN(id)) {
            return next(ApiError.badRequest('id должен быть числом'))
        }

        const subCategory = await SubCategory.findOne({
            where: {id: id}
        })

        if (!name) {
            return next(ApiError.badRequest('Не передано поле name'))
        }

        if (subCategory) {
            subCategory.name = name
            await subCategory.save()
        }

        return res.json(subCategory)
    }

    async updateSubSubCategory(req, res, next) {
        const {id} = req.params
        const {name} = req.body

        if (isNaN(id)) {
            return next(ApiError.badRequest('id должен быть числом'))
        }

        const subSubCategory = await SubSubCategory.findOne({
            where: {id: id}
        })

        if (!name) {
            return next(ApiError.badRequest('Не передано поле name'))
        }

        if (subSubCategory) {
            subSubCategory.name = name
            await subSubCategory.save()
        }

        return res.json(subSubCategory)
    }

    async getCategoryRoute(req, res, next) {
        const {id} = req.params

        if (isNaN(id)) {
            return next(ApiError.badRequest('id должен быть числом'))
        }

        const subSubCategory = await SubSubCategory.findOne({
            where: {id: id}
        })

        if (!subSubCategory) {
            return next(ApiError.badRequest('Нет подподкатегории с таким id'))
        }

        const subCategory = await SubCategory.findOne({
            where: {id: subSubCategory.subCategoryId}
        })

        if (!subCategory) {
            return next(ApiError.badRequest('Нет подкатегории для подподкатегории с таким id'))
        }

        const category = await Category.findOne({
            where : {id: subCategory.categoryId}
        })

        if (!category) {
            return next(ApiError.badRequest('Нет категории для подкатегории с таким id'))
        }

        const route = {category, subCategory, subSubCategory}

        return res.json(route)
    }

    async getCategory(req, res) {
        const category = await Category.findAll()

        return res.json(category)

    }

    async getSubCategory(req, res, next) {
        const {id} = req.params

        if (isNaN(id)) {
            return next(ApiError.badRequest('id должен быть числом'))
        }

        const subCategory = await SubCategory.findAll({
            where: {categoryId: id}
        })

        return res.json(subCategory)
    }

    async getSubSubCategory(req, res, next) {
        const {id} = req.params

        if (isNaN(id)) {
            return next(ApiError.badRequest('id должен быть числом'))
        }

        const subSubCategory = await SubSubCategory.findAll({
            where: {subCategoryId: id}
        })

        return res.json(subSubCategory)
    }
}

module.exports = new CategoryController()
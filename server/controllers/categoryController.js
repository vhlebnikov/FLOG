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

        const category = await Category.findOne({
            where: {id}
        })

        const {subCategory} = req.body
        try {
            if (subCategory) {
                for (const c of subCategory) {
                    await SubCategory.create({
                        name: c.name,
                        categoryId: category.id
                    })
                }
            }

            return res.json(subCategory)
        } catch (e) {
            return next(ApiError.badRequest('Такие подкатегории уже есть'))
        }
    }

    async addSubSubCategory(req, res, next) {
        const {id} = req.params

        const subCategory = await SubCategory.findOne({
            where: {id}
        })

        const {subSubCategory} = req.body

        try {
            if (subSubCategory) {
                for (const c of subSubCategory) {
                    await SubSubCategory.create({
                        name: c.name,
                        subCategoryId: subCategory.id
                    })
                }
            }

            return res.json(subSubCategory)
        } catch (e) {
            return next(ApiError.badRequest('Такие подподкатегории уже есть'))
        }
    }

    async deleteCategory(req, res) {
        const {id} = req.params

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

    async deleteSubCategory(req, res) {
        const {id} = req.params

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

    async deleteSubSubCategory(req, res) {
        const {id} = req.params

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

        const category = await Category.findOne({
            where: {id: id}
        })

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

        const subCategory = await SubCategory.findOne({
            where: {id: id}
        })

        if (subCategory) {
            try {
                subCategory.name = name
                await subCategory.save()
            } catch (e) {
                return next(ApiError.badRequest('Такое имя уже занято'))
            }
        }

        return res.json(subCategory)
    }

    async updateSubSubCategory(req, res, next) {
        const {id} = req.params
        const {name} = req.body

        const subSubCategory = await SubSubCategory.findOne({
            where: {id: id}
        })

        if (subSubCategory) {
            try {
                subSubCategory.name = name
                await subSubCategory.save()
            } catch (e) {
                return next(ApiError.badRequest('Такое имя уже занято'))
            }
        }

        return res.json(subSubCategory)
    }

    async getCategoryRoute(req, res, next) {
        const {id} = req.params

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
            return next(ApiError.badRequest('Нет подкатегории с таким id'))
        }

        const category = await Category.findOne({
            where : {id: subCategory.categoryId}
        })

        if (!category) {
            return next(ApiError.badRequest('Нет категории с таким id'))
        }

        const route = {category, subCategory, subSubCategory}

        return res.json(route)
    }

    async getCategory(req, res) {
        const category = await Category.findAll()

        return res.json(category)

    }

    async getSubCategory(req, res) {
        const {id} = req.params
        const subCategory = await SubCategory.findAll({
            where: {categoryId: id}
        })

        return res.json(subCategory)
    }

    async getSubSubCategory(req, res) {
        const {id} = req.params
        const subSubCategory = await SubSubCategory.findAll({
            where: {subCategoryId: id}
        })

        return res.json(subSubCategory)
    }
}

module.exports = new CategoryController()
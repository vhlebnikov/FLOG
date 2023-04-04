const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    username: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Price = sequelize.define('price', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    type: {type: DataTypes.INTEGER, allowNull: false},
    start: {type: DataTypes.INTEGER},
    end: {type: DataTypes.INTEGER},
})

const Info = sequelize.define('info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
})

const SubCategory = sequelize.define('subCategory', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
})

const SubSubCategory = sequelize.define('subSubCategory', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
})

const Ad = sequelize.define('ad', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    image: {type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING},
    address: {type: DataTypes.STRING},
})

User.hasMany(Ad)
Ad.belongsTo(User)

Ad.hasMany(Info)
Info.belongsTo(Ad)

Ad.hasOne(Price)
Price.belongsTo(Ad)

Category.hasMany(SubCategory)
SubCategory.belongsTo(Category)

SubCategory.hasMany(SubSubCategory)
SubSubCategory.belongsTo(SubCategory)

SubSubCategory.hasMany(Ad)
Ad.belongsTo(SubSubCategory)

module.exports = {
    User,
    Price,
    Info,
    Category,
    SubCategory,
    SubSubCategory,
    Ad,
}
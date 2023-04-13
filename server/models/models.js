const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    username: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
    confirmed: {type: DataTypes.BOOLEAN, defaultValue: false},
    activationLink: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    image: {type: DataTypes.STRING(1000)}
})

const Contact = sequelize.define('contact', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    contact: {type: DataTypes.STRING, allowNull: false},
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
    name: {type: DataTypes.STRING},
})

const SubSubCategory = sequelize.define('subSubCategory', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
})

const Ad = sequelize.define('ad', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING},
    address: {type: DataTypes.STRING},
    status: {type: DataTypes.INTEGER, allowNull: false}
})

const Image = sequelize.define('image', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    image: {type: DataTypes.STRING(1000), allowNull: false}
})

const Comment = sequelize.define('comment', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.TEXT}
})

Ad.hasMany(Comment)
Comment.belongsTo(Ad)

User.hasMany(Comment)
Comment.belongsTo(User)

Ad.hasMany(Image, {as: 'image'})
Image.belongsTo(Ad)

User.hasMany(Ad)
Ad.belongsTo(User)

User.hasMany(Contact, {as: 'contact'})
Contact.belongsTo(User)

Ad.hasMany(Info, {as: 'info'})
Info.belongsTo(Ad)

Price.hasOne(Ad)
Ad.belongsTo(Price)

Category.hasMany(SubCategory)
SubCategory.belongsTo(Category)

SubCategory.hasMany(SubSubCategory)
SubSubCategory.belongsTo(SubCategory)

SubSubCategory.hasMany(Ad)
Ad.belongsTo(SubSubCategory)

module.exports = {
    User,
    Contact,
    Price,
    Info,
    Category,
    SubCategory,
    SubSubCategory,
    Ad,
    Image,
    Comment
}
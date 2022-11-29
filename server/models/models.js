const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    username: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Favourites = sequelize.define('favourites', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const FavouritesAd = sequelize.define('favourites_ad', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Ad = sequelize.define('ad', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

// const Tag = sequelize.define('tag', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     name: {type: DataTypes.STRING, unique: true, allowNull: false},
// })

const AdInfo = sequelize.define('ad_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

// const TagAd = sequelize.define('tag_ad', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
// })

User.hasOne(Favourites)
Favourites.belongsTo(User)

Favourites.hasMany(FavouritesAd)
FavouritesAd.belongsTo(Favourites)

FavouritesAd.hasOne(Ad)
Ad.belongsTo(FavouritesAd)

Ad.hasMany(AdInfo, {as: 'info'})
AdInfo.belongsTo(Ad)

Type.hasMany(Ad)
Ad.belongsTo(Type)

// Tag.belongsToMany(Ad, {through: TagAd})
// Ad.belongsToMany(Tag, {through: TagAd})

module.exports = {
    User,
    Favourites,
    FavouritesAd,
    Ad,
    AdInfo,
    Type,
    // Tag,
    // TagAd,
}

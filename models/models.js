const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "user"},
})

const Favorite = sequelize.define('favorite', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const FavoritePost = sequelize.define('favorite_post', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Post = sequelize.define('post', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Author = sequelize.define('author', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
})

const PostInfo = sequelize.define('post_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    //description: {type: DataTypes.STRING, allowNull: false},
})

const TypeAuthor = sequelize.define('type_author', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

User.hasOne(Favorite);
Favorite.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Favorite.hasMany(FavoritePost);
FavoritePost.belongsTo(Favorite);

Type.hasMany(Post);
Post.belongsTo(Type);

Author.hasMany(Post);
Post.belongsTo(Author);

Post.hasMany(Rating);
Rating.belongsTo(Post);

Post.hasMany(FavoritePost);
FavoritePost.belongsTo(Post);

Post.hasMany(PostInfo, {as:'info'}); 
PostInfo.belongsTo(Post);

Type.belongsToMany(Author, {through: TypeAuthor});
Author.belongsToMany(Type, {through: TypeAuthor}); 


module.exports = {
    User, 
    Favorite, 
    FavoritePost,
    Post,
    Type,
    Author,
    Rating,
    TypeAuthor,
    PostInfo,
}
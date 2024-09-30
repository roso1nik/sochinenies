const {Post, PostInfo} = require('../models/models')
const ApiError = require('../error/ApiError') 

class PostController {
    async create(req, res, next) {
        try {
            let {name, rating, authorId, typeId, info} = req.body
            const post = await Post.create( {name, rating, authorId, typeId} )

            if (info) {
                info = JSON.parse(info)
                info.forEach(i => 
                    PostInfo.create({
                        title: i.title,
                        // description: i.description,
                        postId: post.id
                    })
                )
            }
            //JSON.stringify(info)

            return res.json(post)
        } catch (e) {
            next(ApiError.BadRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {authorId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit 
        let posts; 
        if (!authorId && !typeId) {
            posts = await Post.findAndCountAll({limit, offset})
        }
        if (authorId && !typeId) {
            posts = await Post.findAndCountAll( {where: { authorId }, limit, offset} )
        }
        if (!authorId && typeId) {
            posts = await Post.findAndCountAll( {where: { typeId }, limit, offset} )
        }
        if (authorId && typeId) {
            posts = await Post.findAndCountAll( {where: { authorId, authorId }, limit, offset} )
        }
        return res.json(posts)
    }

    async getOne(req, res) {
        const {id} = req.params
        const post = await Post.findOne(
            {
                where: {id},
                include: [{model: PostInfo, as: 'info'}]
            }
        )

        return res.json(post)
    }
}


module.exports = new PostController();
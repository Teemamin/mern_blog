const Post = require('../model/post')
const Comment = require('../model/comment')
const BadRequestError = require('../errors/badRequest')
const {StatusCodes} = require('http-status-codes')
const fs = require('fs');
const path = require('path');


exports.getAllPosts = async (req,res,next)=>{
    const posts = await Post.find().lean()
    const transformedPosts = []
    for(const post of posts) {
     //posts.forEach(async post=>{
        if(post.comments.length > 0){
        //    let commentDocs = []
           let commentDocs = await  Comment.find({_id: {$in: post.comments}})
        //    for(const cm of post.comments) {
            //post.comments.forEach(async cm=>{
        //         const cmnt = await Comment.findById({_id:cm})
        //         commentDocs.push({ body: cmnt?.body, user: cmnt?.user}) 
        //    }

        transformedPosts.push({...post,comments:commentDocs})
        }else {
            transformedPosts.push(post)
        }
    }
    res.status(StatusCodes.OK).json(transformedPosts)
}

exports.addPost = async (req,res,next)=>{
    const {title,content,status} = req.body
    console.log(__dirname)
    if(!title || !content || !status){
        throw new BadRequestError('Please provide all values')
    }
    const userId = req.user.userId
    const post = await Post.create({title,content,status,createdBy:userId,  img: {
        data: fs.readFileSync(path.join(__dirname , '..','uploads' , req.file.filename)),
        contentType: 'image/png'
    }})

    res.status(StatusCodes.CREATED).json(post)
}

exports.editPost = async (req,res,next)=>{
    res.send('edit view')  
}
exports.commentPost = async (req,res,next)=>{
    const postId = req.params.id
    const {body} = req.body
    if(!body){
        throw new BadRequestError('Comment body must not be empty')
    }
    const comment = await Comment.create({body,post:postId,user: req.user.userId})
    const post = await Post.findOne({_id:postId})
    post.comments.push(comment)
    await post.save()
    res.status(StatusCodes.CREATED).json({post,comment}) //will fix this later to redirect to the post page
}

exports.deletePost = async (req,res,next)=>{
    res.send('delete view')
    
}
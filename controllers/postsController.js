const Post = require('../model/post')
const Comment = require('../model/comment')
const BadRequestError = require('../errors/badRequest')
const {StatusCodes} = require('http-status-codes')
const fs = require('fs');
const path = require('path');


exports.getAllPosts = async (req,res,next)=>{
    let postsQuery =  Post.find().lean()
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 4
    const skip = (page - 1) * limit
    postsQuery= postsQuery.skip(skip).limit(limit)
    const posts = await postsQuery
    const transformedPosts = []
    for(const post of posts) {

        if(post.comments.length > 0){
        //    let commentDocs = await  Comment.find({_id: {$in: post.comments}})
        const numberOfComments = await Comment.aggregate([
            { "$match" : { "_id": { "$in": post.comments } } },
            {
                $count: "no_of_comments"
              }
          ])
           let commentsQuery=   Comment.find({_id: {$in: post.comments}}) // this can potentially be added to the aggregation for optimization
           commentsQuery= commentsQuery.limit(4)
           let commentDocs = await commentsQuery
            transformedPosts.push({...post,comments:commentDocs, noOfComments: numberOfComments[0].no_of_comments})
        }else {
            transformedPosts.push(post)
        }
    }
    const totalPosts = await Post.countDocuments({});
    const numOfPages = Math.ceil(totalPosts / limit); // can use this to display page btn in the frontend
    
    res.status(StatusCodes.OK).json(transformedPosts)
}

exports.addPost = async (req,res,next)=>{
    const {title,content,status} = req.body
    console.log(__dirname)
    if(!title || !content || !status){
        throw new BadRequestError('Please provide all values')
    }
    const userId = req.user.userId
    const post = await Post.create({title,content,status,createdBy:userId,  })

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

exports.getComments = async (req,res,next)=>{
    const postId = req.params.postId
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 4
    const skip = page * limit
    let commentsQuery = Comment.find({post:postId})
    commentsQuery = commentsQuery.skip(skip).limit(limit)
    const comments = await commentsQuery
    res.status(StatusCodes.OK).json(comments)
}

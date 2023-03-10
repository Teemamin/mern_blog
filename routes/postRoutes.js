const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController')

// / getAllPosts (get req)
// /add-post (post req), /edit-post/:id (patch), /delete-post (delete req)
router.get('/', postsController.getAllPosts)
router.post('/add-post', postsController.addPost)
router.post('/:id/comment', postsController.commentPost)
router.patch('/edit-post/:id', postsController.editPost)
router.delete('/delete-post/:id', postsController.deletePost)

module.exports = router
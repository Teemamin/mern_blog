const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController')
require("../services/cloudinary.config");
const upload = require("../services/multer");



router.get('/', postsController.getAllPosts)
router.get('/get-comments/:postId', postsController.getComments)
router.post('/add-post', upload.single("image"), postsController.addPost)
router.post('/add-comment/:commentId', postsController.commentPost)
router.patch('/edit-comment/:commentId', postsController.editComment)
router.patch('/edit-post/:id', postsController.editPost)
router.delete('/delete-post/:id', postsController.deletePost)
router.delete('/delete-comment/:commentId', postsController.deleteComment)

module.exports = router
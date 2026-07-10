const express = require('express');
const router = express.Router();
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/postController');

// GET    /api/posts        → Fetch all posts
router.get('/', getAllPosts);

// GET    /api/posts/:id    → Fetch single post
router.get('/:id', getPostById);

// POST   /api/posts        → Create a new post
router.post('/', createPost);

// PUT    /api/posts/:id    → Update a post
router.put('/:id', updatePost);

// DELETE /api/posts/:id    → Delete a post
router.delete('/:id', deletePost);

module.exports = router;

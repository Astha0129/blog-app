const db = require("../config/db");

/**
 * GET /api/posts
 * Get all posts
 */
const getAllPosts = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM posts ORDER BY created_at DESC"
    );

    res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve posts",
      error: error.message,
    });
  }
};

/**
 * GET /api/posts/:id
 * Get single post
 */
const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query(
      "SELECT * FROM posts WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    console.error("Error fetching post:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve post",
      error: error.message,
    });
  }
};

/**
 * POST /api/posts
 * Create a new post
 */
const createPost = async (req, res) => {
  const {
    title,
    excerpt,
    content,
    author,
    category,
    image,
    readTime,
  } = req.body;

  if (!title || !author || !content) {
    return res.status(400).json({
      success: false,
      message: "Title, Author and Content are required",
    });
  }

  try {
    const [result] = await db.query(
      `
      INSERT INTO posts
      (
        title,
        excerpt,
        content,
        author,
        category,
        image,
        readTime,
        likes
      )
      VALUES
      (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        title,
        excerpt || "",
        content,
        author,
        category || "General",
        image || "https://picsum.photos/600/400",
        readTime || "5 min read",
        0,
      ]
    );

    const [newPost] = await db.query(
      "SELECT * FROM posts WHERE id = ?",
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: newPost[0],
    });
  } catch (error) {
    console.error("Error creating post:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create post",
      error: error.message,
    });
  }
};

/**
 * PUT /api/posts/:id
 * Update a post
 */
const updatePost = async (req, res) => {
  const { id } = req.params;

  const {
    title,
    excerpt,
    content,
    author,
    category,
    image,
    readTime,
  } = req.body;

  try {
    const [existing] = await db.query(
      "SELECT * FROM posts WHERE id = ?",
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const post = existing[0];

    await db.query(
      `
      UPDATE posts
      SET
        title = ?,
        excerpt = ?,
        content = ?,
        author = ?,
        category = ?,
        image = ?,
        readTime = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
      `,
      [
        title ?? post.title,
        excerpt ?? post.excerpt,
        content ?? post.content,
        author ?? post.author,
        category ?? post.category,
        image ?? post.image,
        readTime ?? post.readTime,
        id,
      ]
    );

    const [updatedPost] = await db.query(
      "SELECT * FROM posts WHERE id = ?",
      [id]
    );

    res.json({
      success: true,
      message: "Post updated successfully",
      data: updatedPost[0],
    });
  } catch (error) {
    console.error("Error updating post:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update post",
      error: error.message,
    });
  }
};

/**
 * DELETE /api/posts/:id
 * Delete a post
 */
const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const [existing] = await db.query(
      "SELECT * FROM posts WHERE id = ?",
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    await db.query(
      "DELETE FROM posts WHERE id = ?",
      [id]
    );

    res.json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting post:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete post",
      error: error.message,
    });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
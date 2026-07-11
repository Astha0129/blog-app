import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

const PostContext = createContext(null);

export function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all posts
  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      setLoading(true);
      const res = await api.get("/posts");
      // Guard: ensure we always set an array even if API shape is unexpected
      const data = res.data?.data;
      setPosts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]); // ensure posts is always an array on failure
    } finally {
      setLoading(false);
    }
  }

  // Get one post
  const getPost = (id) => {
    return posts.find((post) => Number(post.id) === Number(id));
  };
  // Create Post
  async function addPost(postData) {
    try {
      const res = await api.post("/posts", postData);
      await fetchPosts();
      return res.data.data;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  }

  // Update Post
  async function updatePost(id, updatedPost) {
    try {
      const res = await api.put(`/posts/${id}`, updatedPost);

      await fetchPosts();
    } catch (error) {
      console.error("Error updating post:", error);
    }
  }

  // Delete Post
  async function deletePost(id) {
    try {
      await api.delete(`/posts/${id}`);
      await fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  }

  // Like Post (Frontend only for now)
  function toggleLike(id) {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === Number(id)
          ? {
              ...post,
              likes: (post.likes || 0) + 1,
            }
          : post,
      ),
    );
  }

  // Add Comment (Frontend only for now)
  function addComment(postId, text) {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === Number(postId)
          ? {
              ...post,
              comments: [
                ...(post.comments || []),
                {
                  id: Date.now(),
                  author: "Guest",
                  text,
                  date: new Date().toLocaleString(),
                },
              ],
            }
          : post,
      ),
    );
  }

  // Delete Comment
  function deleteComment(postId, commentId) {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === Number(postId)
          ? {
              ...post,
              comments: (post.comments || []).filter(
                (comment) => comment.id !== commentId,
              ),
            }
          : post,
      ),
    );
  }

  return (
    <PostContext.Provider
      value={{
        posts,
        loading,
        fetchPosts,
        getPost,
        addPost,
        updatePost,
        deletePost,
        toggleLike,
        addComment,
        deleteComment,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostContext);

  if (!context) {
    throw new Error("usePosts must be used inside PostProvider");
  }

  return context;
}

export default PostContext;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePosts } from "../context/PostContext";

function CreatePost() {
  const navigate = useNavigate();
  const { addPost } = usePosts();

  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "",
    image: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !form.title ||
      !form.author ||
      !form.category ||
      !form.content
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      const newPost = await addPost({
        title: form.title,
        author: form.author,
        category: form.category,
        image: form.image,
        content: form.content,
        excerpt:
          form.content.substring(0, 150) +
          (form.content.length > 150 ? "..." : ""),
        likes: 0,
      });

      navigate(`/posts/${newPost.id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to create post.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-5">

      <Link
        to="/"
        className="btn btn-outline-secondary mb-4"
      >
        ← Back
      </Link>

      <h2 className="mb-4">
        Create New Post
      </h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">

          <label className="form-label">
            Title
          </label>

          <input
            type="text"
            className="form-control"
            name="title"
            value={form.title}
            onChange={handleChange}
          />

        </div>

        <div className="mb-3">

          <label className="form-label">
            Author
          </label>

          <input
            type="text"
            className="form-control"
            name="author"
            value={form.author}
            onChange={handleChange}
          />

        </div>

        <div className="mb-3">

          <label className="form-label">
            Category
          </label>

          <select
            className="form-select"
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option value="">Choose Category</option>
            <option>Technology</option>
            <option>Programming</option>
            <option>JavaScript</option>
            <option>React</option>
            <option>Backend</option>
            <option>Database</option>
            <option>General</option>
          </select>

        </div>

        <div className="mb-3">

          <label className="form-label">
            Image URL
          </label>

          <input
            type="text"
            className="form-control"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="https://..."
          />

        </div>

        <div className="mb-3">

          <label className="form-label">
            Content
          </label>

          <textarea
            rows="10"
            className="form-control"
            name="content"
            value={form.content}
            onChange={handleChange}
          />

        </div>

        <button
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? "Publishing..." : "Publish Post"}
        </button>

      </form>
    </div>
  );
}

export default CreatePost;
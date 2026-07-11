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

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required.";
    if (!form.author.trim()) newErrors.author = "Author name is required.";
    if (!form.category) newErrors.category = "Please select a category.";
    if (!form.content.trim()) newErrors.content = "Content is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const newPost = await addPost({
        title: form.title.trim(),
        author: form.author.trim(),
        category: form.category,
        image: form.image.trim(),
        content: form.content.trim(),
        excerpt:
          form.content.substring(0, 150) +
          (form.content.length > 150 ? "..." : ""),
        likes: 0,
      });

      navigate(`/posts/${newPost.id}`);
    } catch (err) {
      console.error(err);
      setErrors((prev) => ({
        ...prev,
        server: "Failed to create post. Please try again.",
      }));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-container page-enter">
      <Link to="/" className="btn-ghost mb-4" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
        <i className="bi bi-arrow-left" /> Back to Home
      </Link>

      <div className="form-card">
        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <h1
            className="section-heading"
            style={{ fontSize: "1.8rem", marginBottom: "0.25rem" }}
          >
            ✍️ Create New Post
          </h1>
          <p style={{ color: "var(--text-faint)", fontSize: "0.9rem" }}>
            Share your thoughts with the world.
          </p>
        </div>

        {errors.server && (
          <div className="alert-custom alert-danger" style={{ marginBottom: "1.5rem" }}>
            <i className="bi bi-exclamation-triangle-fill" />
            {errors.server}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate id="create-post-form">
          {/* Title */}
          <div className="form-group">
            <label className="form-label-custom" htmlFor="cp-title">
              <i className="bi bi-type-h1" /> Title *
            </label>
            <input
              id="cp-title"
              type="text"
              name="title"
              className={`form-control-custom ${errors.title ? "input-error" : ""}`}
              placeholder="Enter an engaging title…"
              value={form.title}
              onChange={handleChange}
            />
            {errors.title && <p className="field-error">{errors.title}</p>}
          </div>

          {/* Author */}
          <div className="form-group">
            <label className="form-label-custom" htmlFor="cp-author">
              <i className="bi bi-person" /> Author *
            </label>
            <input
              id="cp-author"
              type="text"
              name="author"
              className={`form-control-custom ${errors.author ? "input-error" : ""}`}
              placeholder="Your name"
              value={form.author}
              onChange={handleChange}
            />
            {errors.author && <p className="field-error">{errors.author}</p>}
          </div>

          {/* Category */}
          <div className="form-group">
            <label className="form-label-custom" htmlFor="cp-category">
              <i className="bi bi-tag" /> Category *
            </label>
            <select
              id="cp-category"
              name="category"
              className={`form-control-custom ${errors.category ? "input-error" : ""}`}
              value={form.category}
              onChange={handleChange}
              style={{ cursor: "pointer" }}
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
            {errors.category && <p className="field-error">{errors.category}</p>}
          </div>

          {/* Image URL */}
          <div className="form-group">
            <label className="form-label-custom" htmlFor="cp-image">
              <i className="bi bi-image" /> Cover Image URL{" "}
              <span style={{ color: "var(--text-faint)", fontWeight: 400, textTransform: "none", fontSize: "0.78rem" }}>
                (optional)
              </span>
            </label>
            <input
              id="cp-image"
              type="url"
              name="image"
              className="form-control-custom"
              placeholder="https://example.com/image.jpg"
              value={form.image}
              onChange={handleChange}
            />
          </div>

          {/* Content */}
          <div className="form-group">
            <label className="form-label-custom" htmlFor="cp-content">
              <i className="bi bi-file-text" /> Content *
            </label>
            <textarea
              id="cp-content"
              name="content"
              rows={12}
              className={`form-control-custom ${errors.content ? "input-error" : ""}`}
              placeholder="Write your post content here…"
              value={form.content}
              onChange={handleChange}
            />
            <div className="char-counter">
              {form.content.length} characters
            </div>
            {errors.content && <p className="field-error">{errors.content}</p>}
          </div>

          {/* Actions */}
          <div className="d-flex gap-2 mt-3">
            <button
              type="submit"
              className="btn-primary-custom"
              disabled={loading}
              id="create-post-submit"
            >
              {loading ? (
                <>
                  <span className="spinner-ring" style={{ width: 16, height: 16, borderWidth: 2 }} />
                  Publishing…
                </>
              ) : (
                <>
                  <i className="bi bi-send" /> Publish Post
                </>
              )}
            </button>
            <Link to="/" className="btn-ghost">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
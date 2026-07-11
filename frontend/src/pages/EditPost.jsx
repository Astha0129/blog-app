import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { usePosts } from "../context/PostContext";
import Loading from "../components/Loading";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getPost, updatePost } = usePosts();

  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "",
    image: "",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const post = getPost(id);

    if (!post) {
      navigate("/");
      return;
    }

    setForm({
      title: post.title || "",
      content: post.content || "",
      category: post.category || "",
      image: post.image || "",
    });

    setLoading(false);
  }, [id, getPost, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    let newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required.";
    if (!form.category.trim()) newErrors.category = "Category is required.";
    if (!form.content.trim()) newErrors.content = "Content is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSubmitting(true);
      await updatePost(id, form);
      navigate(`/posts/${id}`);
    } catch (err) {
      console.error(err);
      setErrors((prev) => ({
        ...prev,
        server: "Failed to update post. Please try again.",
      }));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="page-container page-enter">
      <Link
        to={`/posts/${id}`}
        className="btn-ghost mb-4"
        style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
      >
        <i className="bi bi-arrow-left" /> Back to Post
      </Link>

      <div className="form-card">
        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <h1
            className="section-heading"
            style={{ fontSize: "1.8rem", marginBottom: "0.25rem" }}
          >
            ✏️ Edit Post
          </h1>
          <p style={{ color: "var(--text-faint)", fontSize: "0.9rem" }}>
            Update your post details below.
          </p>
        </div>

        {errors.server && (
          <div className="alert-custom alert-danger" style={{ marginBottom: "1.5rem" }}>
            <i className="bi bi-exclamation-triangle-fill" />
            {errors.server}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate id="edit-post-form">
          {/* Title */}
          <div className="form-group">
            <label className="form-label-custom" htmlFor="ep-title">
              <i className="bi bi-type-h1" /> Title *
            </label>
            <input
              id="ep-title"
              type="text"
              name="title"
              className={`form-control-custom ${errors.title ? "input-error" : ""}`}
              value={form.title}
              onChange={handleChange}
              placeholder="Post title…"
            />
            {errors.title && <p className="field-error">{errors.title}</p>}
          </div>

          {/* Category */}
          <div className="form-group">
            <label className="form-label-custom" htmlFor="ep-category">
              <i className="bi bi-tag" /> Category *
            </label>
            <select
              id="ep-category"
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
            {errors.category && (
              <p className="field-error">{errors.category}</p>
            )}
          </div>

          {/* Image URL */}
          <div className="form-group">
            <label className="form-label-custom" htmlFor="ep-image">
              <i className="bi bi-image" /> Cover Image URL{" "}
              <span
                style={{
                  color: "var(--text-faint)",
                  fontWeight: 400,
                  textTransform: "none",
                  fontSize: "0.78rem",
                }}
              >
                (optional)
              </span>
            </label>
            <input
              id="ep-image"
              type="url"
              name="image"
              className="form-control-custom"
              value={form.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Content */}
          <div className="form-group">
            <label className="form-label-custom" htmlFor="ep-content">
              <i className="bi bi-file-text" /> Content *
            </label>
            <textarea
              id="ep-content"
              name="content"
              rows={12}
              className={`form-control-custom ${errors.content ? "input-error" : ""}`}
              value={form.content}
              onChange={handleChange}
              placeholder="Write your post content here…"
            />
            <div className="char-counter">{form.content.length} characters</div>
            {errors.content && <p className="field-error">{errors.content}</p>}
          </div>

          {/* Actions */}
          <div className="d-flex gap-2 mt-3">
            <button
              type="submit"
              className="btn-primary-custom"
              disabled={submitting}
              id="edit-post-submit"
            >
              {submitting ? (
                <>
                  <span
                    className="spinner-ring"
                    style={{ width: 16, height: 16, borderWidth: 2 }}
                  />
                  Updating…
                </>
              ) : (
                <>
                  <i className="bi bi-check-lg" /> Update Post
                </>
              )}
            </button>
            <button
              type="button"
              className="btn-ghost"
              onClick={() => navigate(`/posts/${id}`)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPost;
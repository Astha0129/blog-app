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

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    let newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!form.category.trim()) {
      newErrors.category = "Category is required";
    }

    if (!form.content.trim()) {
      newErrors.content = "Content is required";
    }

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
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">

          <Link
            to={`/posts/${id}`}
            className="btn btn-outline-secondary mb-4"
          >
            ← Back
          </Link>

          <div className="card shadow-sm border-0">

            <div className="card-header bg-warning">
              <h3 className="mb-0">Edit Post</h3>
            </div>

            <div className="card-body">

              <form onSubmit={handleSubmit}>

                {/* Title */}
                <div className="mb-3">
                  <label className="form-label">
                    Title
                  </label>

                  <input
                    type="text"
                    name="title"
                    className={`form-control ${
                      errors.title ? "is-invalid" : ""
                    }`}
                    value={form.title}
                    onChange={handleChange}
                  />

                  {errors.title && (
                    <div className="invalid-feedback">
                      {errors.title}
                    </div>
                  )}
                </div>

                {/* Category */}
                <div className="mb-3">
                  <label className="form-label">
                    Category
                  </label>

                  <input
                    type="text"
                    name="category"
                    className={`form-control ${
                      errors.category ? "is-invalid" : ""
                    }`}
                    value={form.category}
                    onChange={handleChange}
                  />

                  {errors.category && (
                    <div className="invalid-feedback">
                      {errors.category}
                    </div>
                  )}
                </div>

                {/* Image */}
                <div className="mb-3">
                  <label className="form-label">
                    Image URL
                  </label>

                  <input
                    type="text"
                    name="image"
                    className="form-control"
                    value={form.image}
                    onChange={handleChange}
                  />
                </div>

                {/* Content */}
                <div className="mb-3">
                  <label className="form-label">
                    Content
                  </label>

                  <textarea
                    rows="8"
                    name="content"
                    className={`form-control ${
                      errors.content ? "is-invalid" : ""
                    }`}
                    value={form.content}
                    onChange={handleChange}
                  />

                  {errors.content && (
                    <div className="invalid-feedback">
                      {errors.content}
                    </div>
                  )}
                </div>

                <div className="d-flex gap-2">

                  <button
                    type="submit"
                    className="btn btn-warning"
                    disabled={submitting}
                  >
                    {submitting
                      ? "Updating..."
                      : "Update Post"}
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate(`/posts/${id}`)}
                  >
                    Cancel
                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default EditPost;
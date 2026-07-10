import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { usePosts } from "../context/PostContext";
import LikeButton from "../components/LikeButton";
import CommentSection from "../components/CommentSection";
import Loading from "../components/Loading";
import calculateReadTime from "../utils/calculateReadTime";
import { formatDate } from "../utils/formatDate";

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getPost, deletePost, posts } = usePosts();

  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const post = getPost(id);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!post) {
    return (
      <div className="container py-5">
        <h2>Post not found.</h2>

        <Link to="/" className="btn btn-primary mt-3">
          Back Home
        </Link>
      </div>
    );
  }

  const relatedPosts = posts
    .filter(
      (p) =>
        p.id !== post.id &&
        p.category === post.category
    )
    .slice(0, 3);

  const readTime =
    post.readTime ||
    calculateReadTime(post.content || "");

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);

      setTimeout(() => {
        setConfirmDelete(false);
      }, 3000);

      return;
    }

    await deletePost(post.id);

    navigate("/");
  };

  return (
    <div className="container py-5">

      <Link
        to="/"
        className="btn btn-outline-secondary mb-4"
      >
        ← Back
      </Link>

      {/* Image */}

      <img
        src={
          post.image ||
          "https://picsum.photos/1200/500"
        }
        alt={post.title}
        className="img-fluid rounded mb-4"
      />

      {/* Category */}

      <span className="badge bg-primary mb-3">
        {post.category || "General"}
      </span>

      {/* Title */}

      <h1>{post.title}</h1>

      {/* Meta */}

      <div className="d-flex align-items-center justify-content-between flex-wrap my-3">

        <div>

          <strong>{post.author}</strong>

          <br />

          <small className="text-muted">
            {formatDate(
              post.created_at || post.createdAt
            )}{" "}
            • {readTime}
          </small>

        </div>

        <LikeButton
          postId={post.id}
          likes={post.likes || 0}
        />

      </div>

      <hr />

      {/* Content */}

      <p style={{ whiteSpace: "pre-line" }}>
        {post.content}
      </p>

      {/* Delete */}

      <div className="mt-4">

        <button
          className={`btn ${
            confirmDelete
              ? "btn-danger"
              : "btn-outline-danger"
          }`}
          onClick={handleDelete}
        >
          {confirmDelete
            ? "Confirm Delete"
            : "Delete Post"}
        </button>

      </div>

      {/* Comments */}

      <div className="mt-5">
        <CommentSection postId={post.id} />
      </div>

      {/* Related Posts */}

      {relatedPosts.length > 0 && (
        <>
          <hr className="my-5" />

          <h3>Related Posts</h3>

          <div className="row">

            {relatedPosts.map((item) => (

              <div
                className="col-md-4 mb-3"
                key={item.id}
              >

                <div
                  className="card h-100"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    navigate(`/posts/${item.id}`)
                  }
                >

                  <img
                    src={
                      item.image ||
                      "https://picsum.photos/500/300"
                    }
                    className="card-img-top"
                    alt={item.title}
                  />

                  <div className="card-body">

                    <h5>{item.title}</h5>

                    <small className="text-muted">
                      {item.author}
                    </small>

                  </div>

                </div>

              </div>

            ))}

          </div>
        </>
      )}

    </div>
  );
}

export default PostDetail;
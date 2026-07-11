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
      <div className="page-container page-enter" style={{ textAlign: "center", paddingTop: "5rem" }}>
        <span style={{ fontSize: "3rem", display: "block", marginBottom: "1rem", opacity: 0.4 }}>
          📄
        </span>
        <h2 style={{ color: "var(--text-muted)", marginBottom: "0.5rem" }}>
          Post not found
        </h2>
        <p style={{ color: "var(--text-faint)", marginBottom: "1.5rem" }}>
          The post you're looking for doesn't exist or was removed.
        </p>
        <Link to="/" className="btn-primary-custom">
          <i className="bi bi-house" /> Back Home
        </Link>
      </div>
    );
  }

  const relatedPosts = posts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  const readTime = post.readTime || calculateReadTime(post.content || "");

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
      return;
    }
    await deletePost(post.id);
    navigate("/");
  };

  const authorName = post.author?.name || post.author || "Unknown Author";
  const authorAvatar = (post.author?.avatar || authorName.slice(0, 2)).toUpperCase();

  return (
    <div className="page-container page-enter">
      {/* Back */}
      <Link
        to="/"
        className="btn-ghost mb-4"
        style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
      >
        <i className="bi bi-arrow-left" /> Back to Home
      </Link>

      {/* Cover Image */}
      <div
        style={{
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          marginBottom: "2rem",
          maxHeight: 420,
        }}
      >
        <img
          src={post.image || "https://picsum.photos/1200/500"}
          alt={post.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>

      {/* Category badge */}
      <span className="tag-chip mb-3" style={{ display: "inline-flex" }}>
        {post.category || "General"}
      </span>

      {/* Title */}
      <h1 className="post-detail-title" style={{ marginTop: "0.75rem" }}>
        {post.title}
      </h1>

      {/* Meta bar */}
      <div className="post-detail-meta-bar">
        <div className="post-author-avatar">{authorAvatar}</div>
        <div style={{ flex: 1 }}>
          <div className="post-author-name" style={{ fontSize: "0.95rem" }}>
            {authorName}
          </div>
          <div className="post-date">
            <i className="bi bi-calendar3" />
            {formatDate(post.created_at || post.createdAt)}
            &nbsp;·&nbsp;
            <i className="bi bi-clock" />
            {readTime}
          </div>
        </div>

        {/* Like button */}
        <div onClick={(e) => e.stopPropagation()}>
          <LikeButton postId={post.id} likes={post.likes || 0} />
        </div>

        {/* Edit */}
        <Link
          to={`/posts/${post.id}/edit`}
          className="btn-ghost"
          style={{ fontSize: "0.85rem" }}
          onClick={(e) => e.stopPropagation()}
        >
          <i className="bi bi-pencil" /> Edit
        </Link>

        {/* Delete */}
        <button
          className={confirmDelete ? "btn-danger-custom" : "btn-ghost"}
          style={{
            fontSize: "0.85rem",
            ...(confirmDelete ? {} : { color: "var(--danger)", borderColor: "rgba(239,68,68,0.3)" }),
          }}
          onClick={handleDelete}
          id="delete-post-btn"
        >
          <i className={`bi ${confirmDelete ? "bi-exclamation-triangle" : "bi-trash"}`} />
          {confirmDelete ? "Confirm Delete" : "Delete"}
        </button>
      </div>

      {/* Content */}
      <div className="post-detail-content">
        {post.content}
      </div>

      {/* Comments */}
      <div style={{ marginTop: "2.5rem" }}>
        <CommentSection postId={post.id} />
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <>
          <div className="gradient-divider" style={{ margin: "3rem 0 2rem" }} />
          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.4rem",
              fontWeight: 700,
              marginBottom: "1.5rem",
              color: "var(--text-primary)",
            }}
          >
            Related Posts
          </h3>
          <div className="posts-grid">
            {relatedPosts.map((item) => (
              <article
                key={item.id}
                className="post-card"
                onClick={() => navigate(`/posts/${item.id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && navigate(`/posts/${item.id}`)}
              >
                <div className="post-card-cover">
                  <img
                    src={item.image || "https://picsum.photos/500/300"}
                    alt={item.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>
                <div className="post-card-body">
                  <span className="tag-chip mb-2" style={{ display: "inline-flex" }}>
                    {item.category || "General"}
                  </span>
                  <h2 className="post-card-title">{item.title}</h2>
                  <div className="post-card-footer">
                    <span className="post-author-name">{item.author}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default PostDetail;
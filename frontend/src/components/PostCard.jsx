import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../context/PostContext";
import LikeButton from "./LikeButton";
import calculateReadTime from "../utils/calculateReadTime";
import { timeAgo } from "../utils/formatDate";

function PostCard({ post, onDelete, compact = false }) {
  const navigate = useNavigate();
  const { deletePost } = usePosts();

  const [confirmDelete, setConfirmDelete] = useState(false);

  const readTime = post.readTime || calculateReadTime(post.content || "");

  const handleDelete = (e) => {
    e.stopPropagation();

    if (confirmDelete) {
      deletePost(post.id);

      if (onDelete) {
        onDelete(post.id);
      }
      return;
    }

    setConfirmDelete(true);

    setTimeout(() => {
      setConfirmDelete(false);
    }, 3000);
  };

  return (
    <article
      className="post-card"
      onClick={() => navigate(`/posts/${post.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          navigate(`/posts/${post.id}`);
        }
      }}
    >
      {/* Cover Image */}
      <div className="post-card-cover">
        <img
          src={post.image || "https://picsum.photos/600/400"}
          alt={post.title}
          className="img-fluid"
        />
      </div>

      {/* Body */}
      <div className="post-card-body">
        <span className="badge bg-primary mb-2">
          {post.category || "General"}
        </span>

        <h2 className="post-card-title">
          {post.title}
        </h2>

        {!compact && (
          <p className="post-card-excerpt">
            {post.excerpt ||
              (post.content
                ? post.content.substring(0, 150) +
                  (post.content.length > 150 ? "..." : "")
                : "")}
          </p>
        )}

        <div className="post-card-footer">
          <div>
            <strong>{post.author || "Unknown Author"}</strong>

            <br />

            <small className="text-muted">
              {readTime} •{" "}
              {timeAgo(post.created_at || post.createdAt)}
            </small>
          </div>

          <div
            className="d-flex align-items-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <LikeButton
              postId={post.id}
              likes={post.likes || 0}
            />

            <button
              className={`btn btn-sm ${
                confirmDelete
                  ? "btn-danger"
                  : "btn-outline-danger"
              }`}
              onClick={handleDelete}
            >
              {confirmDelete ? "Confirm" : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default PostCard;
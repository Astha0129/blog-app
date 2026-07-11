import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePosts } from "../context/PostContext";
import { timeAgo } from "../utils/formatDate";

function CommentSection({ postId }) {
  const { currentUser, isAuthenticated } = useAuth();
  const { getPost, addComment, deleteComment } = usePosts();

  const post = getPost(postId);
  const comments = post?.comments || [];

  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      setLoading(true);
      await addComment(postId, text.trim());
      setText("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(commentId) {
    try {
      await deleteComment(postId, commentId);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="comments-section" id="comments">
      <h3 className="comments-title">
        Comments{" "}
        <span className="comment-count-badge">{comments.length}</span>
      </h3>

      {/* Comment form */}
      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="comment-form">
          <p className="comment-form-title">
            <i className="bi bi-chat-dots" /> Leave a comment as{" "}
            <strong style={{ color: "var(--primary-light)" }}>
              {currentUser?.name}
            </strong>
          </p>
          <textarea
            className="form-control-custom"
            rows={3}
            placeholder="Write a comment…"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ resize: "vertical" }}
          />
          <button
            type="submit"
            className="btn-primary-custom mt-2"
            style={{ fontSize: "0.875rem", padding: "0.55rem 1.25rem" }}
            disabled={loading || !text.trim()}
          >
            {loading ? (
              <>
                <span className="spinner-ring" style={{ width: 14, height: 14, borderWidth: 2 }} />
                Posting…
              </>
            ) : (
              <>
                <i className="bi bi-send" /> Post Comment
              </>
            )}
          </button>
        </form>
      ) : (
        <div className="alert-custom alert-info">
          <i className="bi bi-info-circle" />
          <span>
            Please{" "}
            <Link to="/login" style={{ color: "var(--primary-light)", fontWeight: 600 }}>
              sign in
            </Link>{" "}
            to leave a comment.
          </span>
        </div>
      )}

      {/* Comment list */}
      <div style={{ marginTop: "1.5rem" }}>
        {comments.length === 0 ? (
          <div className="empty-state" style={{ padding: "3rem 1rem" }}>
            <span className="empty-state-icon">💬</span>
            <h3>No comments yet</h3>
            <p>Be the first to share your thoughts!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <div className="comment-header">
                <div className="comment-avatar">
                  {(comment.author?.name || comment.author || "A")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
                <div style={{ flex: 1 }}>
                  <div className="comment-author">
                    {comment.author?.name || comment.author || "Anonymous"}
                  </div>
                  <div className="comment-time">
                    {timeAgo(comment.createdAt || comment.created_at || comment.date)}
                  </div>
                </div>
                {isAuthenticated &&
                  (currentUser?.id === comment.user_id ||
                    currentUser?.name === comment.author) && (
                    <button
                      className="btn-icon"
                      style={{
                        color: "var(--danger)",
                        borderColor: "rgba(239,68,68,0.3)",
                        width: 30,
                        height: 30,
                        fontSize: "0.8rem",
                      }}
                      onClick={() => handleDelete(comment.id)}
                      title="Delete comment"
                    >
                      <i className="bi bi-trash" />
                    </button>
                  )}
              </div>
              <p className="comment-text">
                {comment.text || comment.content}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CommentSection;
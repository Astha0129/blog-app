import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePosts } from "../context/PostContext";
import { timeAgo } from "../utils/formatDate";

function CommentSection({ postId }) {
  const { currentUser, isAuthenticated } = useAuth();

  const {
    getPost,
    addComment,
    deleteComment,
  } = usePosts();

  const post = getPost(postId);

  const comments = post?.comments || [];

  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!text.trim()) return;

    try {
      setLoading(true);

      await addComment(postId, text);

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
        Comments ({comments.length})
      </h3>

      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="comment-form">
          <textarea
            className="form-control"
            rows={3}
            placeholder="Write a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button
            className="btn btn-primary mt-2"
            disabled={loading}
          >
            {loading ? "Posting..." : "Post Comment"}
          </button>
        </form>
      ) : (
        <div className="alert alert-info">
          Please <Link to="/login">Login</Link> to comment.
        </div>
      )}

      <div className="mt-4">
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="border rounded p-3 mb-3"
            >
              <div className="d-flex justify-content-between">
                <div>
                  <strong>
                    {comment.author?.name ||
                      comment.author ||
                      "Anonymous"}
                  </strong>

                  <div className="text-muted small">
                    {timeAgo(
                      comment.createdAt || comment.created_at
                    )}
                  </div>
                </div>

                {isAuthenticated &&
                  currentUser?.id === comment.user_id && (
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() =>
                        handleDelete(comment.id)
                      }
                    >
                      Delete
                    </button>
                  )}
              </div>

              <p className="mt-2 mb-0">
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
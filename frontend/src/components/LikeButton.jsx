import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { usePosts } from '../context/PostContext';

function LikeButton({ postId, likes, likedBy = [], small = false }) {
  const { currentUser, isAuthenticated } = useAuth();
  const { toggleLike } = usePosts();
  const [animating, setAnimating] = useState(false);

  const isLiked = isAuthenticated && likedBy.includes(currentUser?.id);

  const handleLike = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      // Redirect or show hint — just ignore click for now
      return;
    }
    setAnimating(true);
    toggleLike(postId, currentUser.id);
    setTimeout(() => setAnimating(false), 400);
  };

  return (
    <button
      className={`like-btn ${isLiked ? 'liked' : ''} ${animating ? 'animating' : ''} ${small ? 'like-btn-sm' : ''}`}
      onClick={handleLike}
      title={isAuthenticated ? (isLiked ? 'Unlike' : 'Like') : 'Sign in to like'}
      aria-label={`${likes} likes`}
      id={`like-btn-${postId}`}
    >
      <i className={`bi ${isLiked ? 'bi-heart-fill' : 'bi-heart'}`} />
      <span>{likes}</span>
    </button>
  );
}

export default LikeButton;

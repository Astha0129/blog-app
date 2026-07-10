import React, { useState } from 'react';
import PostCard from './PostCard';
import EmptyState from './EmptyState';

function PostList({ posts, loading, onDelete, defaultView = 'grid' }) {
  const [view, setView] = useState(defaultView);

  if (loading) return null; // Loading handled by parent

  if (!posts || posts.length === 0) {
    return <EmptyState />;
  }

  return (
    <div>
      {/* View toggle */}
      <div className="d-flex justify-content-end mb-3">
        <div className="view-toggle">
          <button
            className={`view-btn ${view === 'grid' ? 'active' : ''}`}
            onClick={() => setView('grid')}
            title="Grid view"
          >
            <i className="bi bi-grid-3x2-gap" />
          </button>
          <button
            className={`view-btn ${view === 'list' ? 'active' : ''}`}
            onClick={() => setView('list')}
            title="List view"
          >
            <i className="bi bi-list-ul" />
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className={`posts-grid ${view === 'list' ? 'list-view' : ''}`}>
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onDelete={onDelete}
            compact={view === 'list'}
          />
        ))}
      </div>
    </div>
  );
}

export default PostList;

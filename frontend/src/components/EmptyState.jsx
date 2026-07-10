import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * EmptyState component for when no posts/results are found.
 * @param {'no-posts' | 'no-results' | 'no-profile-posts' | 'custom'} type
 */
function EmptyState({
  type = 'no-results',
  icon = '📭',
  title,
  description,
  actionLabel,
  onAction,
}) {
  const navigate = useNavigate();

  const configs = {
    'no-posts': {
      icon: '📝',
      title: 'No posts yet',
      description: 'Be the first to share your story with the world.',
      actionLabel: 'Write a Post',
      onAction: () => navigate('/posts/new'),
    },
    'no-results': {
      icon: '🔍',
      title: 'No results found',
      description: 'Try different keywords or clear your filters.',
      actionLabel: 'Clear Filters',
      onAction: null,
    },
    'no-profile-posts': {
      icon: '✍️',
      title: 'No posts yet',
      description: "You haven't written any posts yet. Share your first story!",
      actionLabel: 'Write Your First Post',
      onAction: () => navigate('/posts/new'),
    },
  };

  const config = configs[type] || {
    icon,
    title: title || 'Nothing here',
    description: description || '',
    actionLabel: actionLabel || null,
    onAction: onAction || null,
  };

  return (
    <div className="empty-state">
      <span className="empty-state-icon">{config.icon}</span>
      <h3>{config.title}</h3>
      {config.description && <p>{config.description}</p>}
      {config.actionLabel && config.onAction && (
        <button
          className="btn-primary-custom mt-3"
          onClick={config.onAction}
          style={{ margin: '1.25rem auto 0' }}
        >
          <i className="bi bi-plus-lg" />
          {config.actionLabel}
        </button>
      )}
    </div>
  );
}

export default EmptyState;

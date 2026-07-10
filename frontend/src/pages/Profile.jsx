import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePosts } from '../context/PostContext';
import PostCard from '../components/PostCard';
import EmptyState from '../components/EmptyState';
import { formatMonthYear } from '../utils/formatDate';
import { validateUsername } from '../utils/validation';

function Profile() {
  const navigate = useNavigate();
  const { currentUser, logout, updateProfile } = useAuth();
  const { posts } = usePosts();

  const userPosts = posts.filter((p) => p.author?.id === currentUser?.id);
  const totalLikes = userPosts.reduce((sum, p) => sum + (p.likes || 0), 0);

  const [editing, setEditing] = useState(false);
  const [bioForm, setBioForm] = useState({ name: currentUser?.name || '', bio: currentUser?.bio || '' });
  const [bioError, setBioError] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    const nameErr = validateUsername(bioForm.name);
    if (nameErr) { setBioError(nameErr); return; }
    updateProfile({ name: bioForm.name.trim(), bio: bioForm.bio.trim() });
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="page-container page-enter" style={{ maxWidth: 900 }}>
      {/* Profile card */}
      <div className="profile-card glass-card mb-4">
        <div className="profile-cover" />
        <div className="profile-body">
          <div className="profile-avatar-wrap">
            <div className="profile-avatar">
              {currentUser?.avatar || currentUser?.name?.slice(0, 2).toUpperCase()}
            </div>
          </div>

          <div className="profile-info">
            {editing ? (
              <div className="d-flex flex-column gap-2" style={{ maxWidth: 400 }}>
                <input
                  className="form-control-custom"
                  value={bioForm.name}
                  onChange={(e) => { setBioForm((p) => ({ ...p, name: e.target.value })); setBioError(''); }}
                  placeholder="Your name"
                  style={{ fontSize: '1.1rem', fontWeight: 600 }}
                />
                <textarea
                  className="form-control-custom"
                  value={bioForm.bio}
                  onChange={(e) => setBioForm((p) => ({ ...p, bio: e.target.value }))}
                  placeholder="Tell us about yourself…"
                  rows={2}
                  style={{ minHeight: 60 }}
                />
                {bioError && <p className="field-error mb-0">{bioError}</p>}
                <div className="d-flex gap-2">
                  <button className="btn-primary-custom" style={{ fontSize: '0.875rem', padding: '0.5rem 1.2rem' }} onClick={handleSave}>
                    <i className="bi bi-check" /> Save
                  </button>
                  <button className="btn-ghost" style={{ fontSize: '0.875rem' }} onClick={() => { setEditing(false); setBioError(''); }}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h1 className="profile-name">
                  {currentUser?.name}
                  {saved && <span style={{ color: 'var(--success)', fontSize: '0.85rem', fontWeight: 500, marginLeft: '0.75rem' }}>✓ Saved</span>}
                </h1>
                <p className="profile-email">{currentUser?.email}</p>
                {currentUser?.bio ? (
                  <p className="profile-bio">{currentUser.bio}</p>
                ) : (
                  <p style={{ color: 'var(--text-faint)', fontSize: '0.875rem' }}>No bio yet.</p>
                )}
                <p style={{ color: 'var(--text-faint)', fontSize: '0.8rem', marginTop: '0.35rem' }}>
                  <i className="bi bi-calendar3 me-1" />
                  Member since {formatMonthYear(currentUser?.joinedAt)}
                </p>
              </>
            )}
          </div>

          <div className="profile-actions">
            {!editing && (
              <button className="btn-ghost" onClick={() => setEditing(true)} id="edit-profile-btn">
                <i className="bi bi-pencil" /> Edit Profile
              </button>
            )}
            <button className="btn-ghost" onClick={() => navigate('/posts/new')}>
              <i className="bi bi-pencil-square" /> Write Post
            </button>
            <button
              className="btn-ghost"
              onClick={handleLogout}
              style={{ color: 'var(--danger)', borderColor: 'rgba(239,68,68,0.3)' }}
              id="logout-btn"
            >
              <i className="bi bi-box-arrow-right" /> Sign Out
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div className="profile-stats-row">
          {[
            { label: 'Posts',      value: userPosts.length,             icon: 'bi-file-text' },
            { label: 'Total Likes', value: totalLikes,                  icon: 'bi-heart' },
            { label: 'Comments',   value: userPosts.reduce((s, p) => s + (p.comments?.length || 0), 0), icon: 'bi-chat' },
          ].map(({ label, value, icon }) => (
            <div key={label} className="profile-stat">
              <i className={`bi ${icon}`} style={{ color: 'var(--primary-light)' }} />
              <div className="profile-stat-num">{value}</div>
              <div className="profile-stat-label">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* My Posts */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="section-heading" style={{ fontSize: '1.5rem', marginBottom: 0 }}>
          My Posts
        </h2>
        <button className="btn-primary-custom" style={{ fontSize: '0.875rem', padding: '0.55rem 1.2rem' }} onClick={() => navigate('/posts/new')}>
          <i className="bi bi-plus-lg" /> New Post
        </button>
      </div>

      {userPosts.length === 0 ? (
        <EmptyState type="no-profile-posts" />
      ) : (
        <div className="posts-grid">
          {userPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile;

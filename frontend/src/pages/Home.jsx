import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { usePosts } from "../context/PostContext";
import Hero from "../components/Hero";
import PostList from "../components/PostList";
import CategoryFilter from "../components/CategoryFilter";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";
import LikeButton from "../components/LikeButton";
import calculateReadTime from "../utils/calculateReadTime";
import { timeAgo } from "../utils/formatDate";

const POSTS_PER_PAGE = 6;

/* ── Featured Card (defined before use) ──────────────────────────── */
function FeaturedCard({ post }) {
  const navigate = useNavigate();
  const readTime = calculateReadTime(post.content);
  const authorName = post.author?.name || post.author || "Unknown";
  const authorAvatar =
    post.author?.avatar || authorName.slice(0, 2).toUpperCase();

  return (
    <div
      className="featured-card"
      onClick={() => navigate(`/posts/${post.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && navigate(`/posts/${post.id}`)}
    >
      <div>
        <div className="featured-badge">
          <i className="bi bi-trophy" /> Most Liked
        </div>
        <h2 className="featured-title">{post.title}</h2>
        <p className="featured-excerpt">{post.excerpt}</p>
        <div className="post-meta">
          <div className="post-author-avatar">{authorAvatar}</div>
          <div>
            <div className="post-author-name">{authorName}</div>
            <div className="post-date">
              <i className="bi bi-clock" /> {readTime} &nbsp;·&nbsp;{" "}
              {timeAgo(post.createdAt)}
            </div>
          </div>
          <div
            style={{ marginLeft: "1rem" }}
            onClick={(e) => e.stopPropagation()}
          >
            <LikeButton
              postId={post.id}
              likes={post.likes}
              likedBy={post.likedBy}
            />
          </div>
        </div>
      </div>
      <div className="featured-visual" style={{ background: post.gradient }}>
        <span style={{ fontSize: "4rem", position: "relative", zIndex: 1 }}>
          {post.emoji}
        </span>
      </div>
    </div>
  );
}

/* ── Home Page ────────────────────────────────────────────────────── */
function Home() {
  const { posts, loading } = usePosts();
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(
    searchParams.get("category") || "All",
  );
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  // Sync URL params → state
  useEffect(() => {
    const q = searchParams.get("search") || "";
    const c = searchParams.get("category") || "All";
    setSearch(q);
    setCategory(c);
  }, [searchParams]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = {};
    posts.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [posts]);

  // Filter + sort
  const filtered = useMemo(() => {
    let result = [...posts];
    if (category !== "All")
      result = result.filter((p) => p.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          (p.author?.name || p.author || "").toLowerCase().includes(q) ||
          (p.tags || []).some((t) => t.toLowerCase().includes(q)),
      );
    }
    if (sort === "newest")
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (sort === "oldest")
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    if (sort === "popular") result.sort((a, b) => b.likes - a.likes);
    if (sort === "title") result.sort((a, b) => a.title.localeCompare(b.title));
    return result;
  }, [posts, category, search, sort]);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE,
  );

  const handleSearch = (q) => {
    setSearch(q);
    setPage(1);
    const params = new URLSearchParams(searchParams);
    if (q) params.set("search", q);
    else params.delete("search");
    setSearchParams(params, { replace: true });
  };

  const handleCategory = (cat) => {
    setCategory(cat);
    setPage(1);
    const params = new URLSearchParams(searchParams);
    if (cat !== "All") params.set("category", cat);
    else params.delete("category");
    setSearchParams(params, { replace: true });
  };

  const handleSort = (e) => {
    setSort(e.target.value);
    setPage(1);
  };

  const featuredPost =
    posts.length > 0
      ? posts.reduce(
          (max, p) => (p.likes > (max?.likes || 0) ? p : max),
          posts[0],
        )
      : null;

  return (
    <>
      <Hero onSearch={handleSearch} />

      <div className="page-container page-enter" id="posts-section">
        {/* Featured post */}
        {!search && category === "All" && featuredPost && !loading && (
          <div className="mb-4">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1rem",
              }}
            >
              <span
                style={{
                  color: "var(--text-faint)",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                ✦ Featured
              </span>
              <div
                style={{
                  flex: 1,
                  height: 1,
                  background: "var(--border-subtle)",
                }}
              />
            </div>
            <FeaturedCard post={featuredPost} />
          </div>
        )}

        {/* Controls */}
        <div className="section-controls">
          <CategoryFilter
            selected={category}
            onChange={handleCategory}
            counts={categoryCounts}
          />
          <div className="d-flex gap-2 ms-auto flex-shrink-0">
            <SearchBar onSearch={handleSearch} initialValue={search} />
            <select
              className="sort-select"
              value={sort}
              onChange={handleSort}
              id="sort-select"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="popular">Most Liked</option>
              <option value="title">A–Z</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        {!loading && (
          <div className="d-flex align-items-center justify-content-between mb-3">
            <p style={{ color: "var(--text-faint)", fontSize: "0.85rem" }}>
              {filtered.length} {filtered.length === 1 ? "article" : "articles"}
              {search && ` matching "${search}"`}
              {category !== "All" && ` in ${category}`}
            </p>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <Loading variant="skeleton" count={6} />
        ) : filtered.length === 0 ? (
          <EmptyState
            type={search || category !== "All" ? "no-results" : "no-posts"}
          />
        ) : (
          <>
            <PostList posts={paginated} />
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </>
  );
}

export default Home;

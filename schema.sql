-- ============================================================
--  Blog Application Database Schema
--  Compatible with: MySQL 8.x, PlanetScale, Aiven, Railway
-- ============================================================

-- Create the database (skip if already exists)
CREATE DATABASE IF NOT EXISTS blogdb
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE blogdb;

-- ─── Table: posts ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS posts (
  id          INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  title       VARCHAR(255)    NOT NULL,
  author      VARCHAR(100)    NOT NULL,
  content     TEXT            NOT NULL,
  created_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  INDEX idx_created_at (created_at DESC)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

-- ─── Sample Data ─────────────────────────────────────────────────────────────
INSERT INTO posts (title, author, content, created_at) VALUES
(
  'Getting Started with React and Express',
  'Alice Johnson',
  'Building full-stack applications with React on the frontend and Express on the backend has never been easier. In this post, we explore the foundational concepts: setting up a Vite project, configuring Axios for API calls, and wiring everything to a Node.js REST API.\n\nThe key advantage of this stack is its JavaScript-first approach — you write JS on both ends, share data models easily, and deploy to commodity hosting like Vercel and Render. Whether you are a seasoned developer or just starting out, this combination gives you a powerful and productive development experience.',
  NOW() - INTERVAL 10 DAY
),
(
  'MySQL Best Practices for Node.js Applications',
  'Bob Martinez',
  'When connecting Node.js to MySQL, always use a connection pool instead of a single connection. The mysql2 library provides a convenient .promise() wrapper that lets you use async/await throughout your code, keeping things clean and readable.\n\nIn this guide we cover: creating a pool with sensible defaults, enabling keepAlive to prevent idle timeouts on cloud databases, handling errors gracefully, and writing parameterized queries to protect against SQL injection. Following these practices will make your application robust and production-ready.',
  NOW() - INTERVAL 7 DAY
),
(
  'Deploying Your Full-Stack App for Free',
  'Carol Williams',
  'Deploying a full-stack application no longer requires a large budget. In 2024 you can host your Express backend on Render (free tier), your React frontend on Vercel (free tier), and your MySQL database on Railway or Aiven — all for $0.\n\nThis post walks through each step: creating a Render Web Service from your GitHub repo, setting environment variables, configuring the Vercel build settings for a Vite project, and spinning up a Railway MySQL instance. By the end you will have a live, publicly accessible blog running in the cloud.',
  NOW() - INTERVAL 3 DAY
),
(
  'Understanding REST API Design',
  'David Kim',
  'A well-designed REST API is predictable, consistent, and a joy to consume. The core principles are simple: use nouns for resource URLs (/posts, not /getPosts), leverage HTTP verbs (GET, POST, PUT, DELETE) to convey intent, return appropriate status codes (201 for created, 404 for not found, 400 for bad input), and always respond with a consistent JSON envelope.\n\nIn this post we break down each principle with real examples drawn from our blogging application, showing how small API design decisions have a big impact on the developer experience of anyone integrating with your service.',
  NOW() - INTERVAL 1 DAY
);

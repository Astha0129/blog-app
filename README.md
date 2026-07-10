# ✦ BlogSphere — Full-Stack Blogging Platform

A production-ready blogging application built with **React + Vite**, **Node.js + Express**, and **MySQL**.

| Layer    | Tech                          | Hosting target         |
|----------|-------------------------------|------------------------|
| Frontend | React 18, Vite, React Router DOM v6, Bootstrap 5, Axios | Vercel / Netlify |
| Backend  | Node.js, Express.js, mysql2   | Render / Railway       |
| Database | MySQL 8                       | Railway / PlanetScale / Aiven |

---

## Project Structure

```
blog-app/
├── frontend/                  # React + Vite application
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js       ← Centralized Axios instance
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── PostCard.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── PostDetail.jsx
│   │   │   ├── CreatePost.jsx
│   │   │   ├── EditPost.jsx
│   │   │   └── NotFound.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── backend/                   # Express REST API
│   ├── config/
│   │   └── db.js              ← MySQL2 pool (promise wrapper)
│   ├── controllers/
│   │   └── postController.js  ← CRUD handlers
│   ├── routes/
│   │   └── postRoutes.js      ← Express Router
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── schema.sql                 ← Database + sample data
└── README.md
```

---

## REST API Reference

| Method | Endpoint           | Description              |
|--------|--------------------|--------------------------|
| GET    | `/api/posts`       | Get all posts (newest first) |
| GET    | `/api/posts/:id`   | Get a single post        |
| POST   | `/api/posts`       | Create a new post        |
| PUT    | `/api/posts/:id`   | Update a post            |
| DELETE | `/api/posts/:id`   | Delete a post            |

**Request body (POST / PUT):**
```json
{
  "title":   "My Post Title",
  "author":  "Jane Doe",
  "content": "Post body text..."
}
```

**Unified response envelope:**
```json
{ "success": true, "data": { ... }, "message": "..." }
```

---

## Local Development Setup

### Prerequisites

- Node.js ≥ 18
- MySQL 8 (local install or Docker)

### 1 — Database

```bash
# Option A: local MySQL CLI
mysql -u root -p < schema.sql

# Option B: Docker one-liner
docker run --name blogdb -e MYSQL_ROOT_PASSWORD=secret -e MYSQL_DATABASE=blogdb -p 3306:3306 -d mysql:8
mysql -h 127.0.0.1 -u root -psecret < schema.sql
```

### 2 — Backend

```bash
cd backend
cp .env.example .env          # Edit DB credentials in .env
npm install
npm run dev                   # Starts on http://localhost:5000
```

### 3 — Frontend

```bash
cd frontend
npm install
npm run dev                   # Starts on http://localhost:3000
```

> The Vite dev-server proxies `/api/*` to `http://localhost:5000` automatically — no CORS issues during development.

---

## Deployment

### MySQL — Railway (recommended free tier)

1. Go to [railway.app](https://railway.app) → **New Project** → **Provision MySQL**
2. Click the MySQL service → **Variables** tab → copy the connection string values
3. Use those values in your backend environment variables below

### Backend — Render

1. Push `backend/` to a GitHub repository (or the whole monorepo)
2. Create a **New Web Service** on [render.com](https://render.com)
3. Set the **Root Directory** to `backend`
4. **Build command:** `npm install`
5. **Start command:** `npm start`
6. Add environment variables in the Render dashboard:

| Variable      | Value                          |
|---------------|--------------------------------|
| `DB_HOST`     | Railway MySQL host             |
| `DB_USER`     | Railway MySQL user             |
| `DB_PASSWORD` | Railway MySQL password         |
| `DB_NAME`     | `blogdb`                       |
| `DB_PORT`     | `3306`                         |
| `PORT`        | `5000` (Render sets this too)  |
| `FRONTEND_URL`| `https://your-app.vercel.app`  |

### Frontend — Vercel

1. Import the GitHub repo (or the `frontend/` folder) in [vercel.com](https://vercel.com)
2. **Framework preset:** Vite
3. **Root directory:** `frontend`
4. Add environment variable:

| Variable            | Value                                    |
|---------------------|------------------------------------------|
| `VITE_API_BASE_URL` | `https://your-backend.onrender.com/api`  |

5. Click **Deploy** — Vercel handles the Vite build automatically.

---

## Alternative Hosting Options

| Service      | Use for      | Notes                                |
|--------------|--------------|--------------------------------------|
| Railway      | Backend      | Supports Node.js natively, $5/mo     |
| Netlify      | Frontend     | Add `_redirects`: `/* /index.html 200` for SPA |
| PlanetScale  | MySQL        | Serverless MySQL, generous free tier |
| Aiven        | MySQL        | Free 1-month trial, then paid        |

### Netlify SPA redirect

Create `frontend/public/_redirects`:
```
/* /index.html 200
```

---

## Environment Variables Reference

### `backend/.env`

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=blogdb
DB_PORT=3306
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### `frontend/.env`

```env
# Leave blank for local dev (Vite proxy handles it)
# Set this only for production builds:
VITE_API_BASE_URL=https://your-backend.onrender.com/api
```

---

## Scripts

### Backend

| Command       | Action                          |
|---------------|---------------------------------|
| `npm run dev` | Start with nodemon (auto-reload)|
| `npm start`   | Start for production            |

### Frontend

| Command         | Action                           |
|-----------------|----------------------------------|
| `npm run dev`   | Dev server on port 3000          |
| `npm run build` | Production build → `dist/`       |
| `npm run preview` | Preview the production build   |

---

## License

MIT

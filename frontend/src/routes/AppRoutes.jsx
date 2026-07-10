import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from '../components/ProtectedRoute';

import Home       from '../pages/Home';
import Login      from '../pages/Login';
import Signup     from '../pages/Signup';
import PostDetail from '../pages/PostDetail';
import CreatePost from '../pages/CreatePost';
import EditPost   from '../pages/EditPost';
import Profile    from '../pages/Profile';
import NotFound   from '../pages/NotFound';

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Public routes */}
        <Route index            element={<Home />} />
        <Route path="/login"    element={<Login />} />
        <Route path="/signup"   element={<Signup />} />
        <Route path="/posts/:id" element={<PostDetail />} />

        {/* Protected routes */}
        <Route
          path="/posts/new"
          element={<ProtectedRoute><CreatePost /></ProtectedRoute>}
        />
        <Route
          path="/posts/:id/edit"
          element={<ProtectedRoute><EditPost /></ProtectedRoute>}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute><Profile /></ProtectedRoute>}
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;

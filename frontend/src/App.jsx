import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateBlog from "./pages/CreateBlog";
import Draft from "./pages/Draft";
import BlogDetails from "./pages/BlogDetails";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
       <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
       <Route path="/create-blog" element={<ProtectedRoute><CreateBlog /></ProtectedRoute>} />
       <Route path="/draft" element={<ProtectedRoute><Draft /></ProtectedRoute>} />
       <Route path="/blog/:id" element={<ProtectedRoute><BlogDetails /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
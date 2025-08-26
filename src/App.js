import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Urlshort from "./components/Urlshort";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./routes/ProtectedRoute"; 
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Urlshort />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route 
          path="/admin-dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;

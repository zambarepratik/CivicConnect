import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserDashboard from './pages/UserDashboard';
import OfficerDashboard from './pages/OfficerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Citizen Route */}
        <Route element={<ProtectedRoute allowedRoles={['user']} />}>
          <Route path="/user-dashboard" element={<UserDashboard />} />
        </Route>

        {/* Protected Officer Route */}
        <Route element={<ProtectedRoute allowedRoles={['officer']} />}>
          <Route path="/officer-dashboard" element={<OfficerDashboard />} />
        </Route>

        {/* Protected Admin Route */}
        <Route element={<ProtectedRoute allowedRoles={['super_admin', 'admin']} />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
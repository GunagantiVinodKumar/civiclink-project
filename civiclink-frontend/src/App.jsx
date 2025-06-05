import { Routes, Route, Navigate } from 'react-router-dom';
import LogInForm from './LogInForm';
import RegisterForm from './RegisterForm';
import CitizenDashboard from './CitizenDashboard';
import { useAuth } from './AuthContext.jsx';

function App() {
  const {isLoggedIn }= useAuth();

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <LogInForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/dashboard" element={isLoggedIn ? <CitizenDashboard /> : <Navigate to="/" />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;

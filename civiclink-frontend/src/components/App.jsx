import { Routes, Route, Navigate } from 'react-router-dom';
import LogInForm from     './LogInForm';
import RegisterForm from  './RegisterForm';
import CitizenDashboard from './CitizenDashboard';
import { useAuth } from   './AuthContext.jsx';
import ReportIssue from   '../pages/ReportIssue';
import CivicEvents from        '../pages/CivicEvents';
import VillageInfo from   '../pages/VillageInfo';
import Announcements from '../pages/Announcements';
import Feedback from      '../pages/Feedback';
import AdminPanel from    '../pages/AdminPanel';

function App() {
  const {isLoggedIn ,role}= useAuth();

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <LogInForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/dashboard" element={isLoggedIn ? <CitizenDashboard /> : <Navigate to="/" />} />
      <Route path="/report" element={isLoggedIn ? <ReportIssue /> : <Navigate to="/" />} />
      <Route path="/events" element={isLoggedIn ? <CivicEvents /> : <Navigate to ="/" />} />
      <Route path="/village-info" element={isLoggedIn ? <VillageInfo/> : <Navigate to="/" />} />
      <Route path ="/announcements" element={isLoggedIn ? <Announcements/> : <Navigate to="/"/>} />
      <Route path="/feedback" element={isLoggedIn ? <Feedback/> : <Navigate to="/"/>} />
      <Route path="/admin" element={role === "ADMIN" ? <AdminPanel /> : <Navigate to="/" />} />
    </Routes>
  );
}

export default App;

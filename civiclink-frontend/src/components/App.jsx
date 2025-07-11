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
import MyReports from      '../pages/MyReports';
import FeedbackResult from '../pages/FeedbackResult';

function App() {
  const {isLoggedIn ,role}= useAuth();

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? (role == "ADMIN" ? <Navigate to="/admin/dashboard" /> : <Navigate to="/resident/dashboard" />) : <LogInForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/resident/dashboard" element={isLoggedIn && role == "RESIDENT" ? <CitizenDashboard /> : <Navigate to="/" />} />
      <Route path="/report" element={isLoggedIn ? <ReportIssue /> : <Navigate to="/" />} />
      <Route path="/my-reports" element={isLoggedIn ? <MyReports /> : <Navigate to="/"/>} />
      <Route path="/events" element={isLoggedIn ? <CivicEvents /> : <Navigate to ="/" />} />
      <Route path="/village-info" element={isLoggedIn ? <VillageInfo/> : <Navigate to="/" />} />
      <Route path ="/announcements" element={isLoggedIn ? <Announcements/> : <Navigate to="/"/>} />
      <Route path="/feedback" element={isLoggedIn ? <Feedback/> : <Navigate to="/"/>} />
      <Route path="/admin/dashboard" element={isLoggedIn && role === "ADMIN" ? <AdminPanel /> : <Navigate to="/" />} />
      <Route path="/feedback/result" element={isLoggedIn ? <FeedbackResult /> : <Navigate to="/"/>} />
    </Routes>
  );
}

export default App;

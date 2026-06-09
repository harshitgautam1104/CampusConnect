import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login'; 
import Dashboard from './pages/Dashboard'; // YE SAHI HONA CHAHIYE
import Notices from './pages/Notices';
import Materials from './pages/Materials';
import Placements from './pages/Placements';
import Forum from './pages/Forum';
import Events from './pages/Events';
import LostFound from './pages/LostFound';
import Profile from './pages/Profile';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* Baaki sab Layout ke andar */}
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/notices" element={<Layout><Notices /></Layout>} />
        <Route path="/materials" element={<Layout><Materials /></Layout>} />
        <Route path="/placements" element={<Layout><Placements /></Layout>} />
        <Route path="/forum" element={<Layout><Forum /></Layout>} />
        <Route path="/events" element={<Layout><Events /></Layout>} />
        <Route path="/lost-found" element={<Layout><LostFound /></Layout>} />
        <Route path="/profile" element={<Layout><Profile /></Layout>} />
        
      </Routes>
    </Router>
  );
}
export default App;
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DataProvider } from './hooks/usePortfolioData';
import Portfolio from './pages/Portfolio';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import BackgroundGradients from './components/BackgroundGradients';
import BackToTop from './components/BackToTop';
import ScrollToTop from './components/ScrollToTop';
import SkillsPage from './pages/SkillsPage';
import ProjectsPage from './pages/ProjectsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <ScrollToTop />
        <BackgroundGradients />
        <BackToTop />
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

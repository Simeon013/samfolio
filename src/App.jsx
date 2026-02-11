import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DataProvider } from './hooks/usePortfolioData';
import Portfolio from './pages/Portfolio';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import BackgroundGradients from './components/BackgroundGradients';
import BackToTop from './components/BackToTop';

export default function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <BackgroundGradients />
        <BackToTop />
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

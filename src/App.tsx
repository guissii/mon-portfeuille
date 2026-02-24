import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HomeSimple as Home } from '@/pages/HomeSimple';
import { Projects } from '@/pages/Projects';
import { ProjectDetail } from '@/pages/ProjectDetail';
import { Certifications } from '@/pages/Certifications';
import { CertificationDetail } from '@/pages/CertificationDetail';
import { Hackathons } from '@/pages/Hackathons';
import { HackathonDetail } from '@/pages/HackathonDetail';
import { Engineering } from '@/pages/Engineering';
import { ArticleDetail } from '@/pages/ArticleDetail';
import { Agenda } from '@/pages/Agenda';
import { AdminLogin } from '@/pages/admin/Login';
import { AdminDashboard } from '@/pages/admin/Dashboard';
import './App.css';

// Layout pour les pages publiques
function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cyber-black">
      <Header />
      <main>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {children}
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

// Layout pour l'admin (sans header/footer)
function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-cyber-black">{children}</div>;
}

function App() {
  return (
    <BrowserRouter>
      <Analytics />
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/projects" element={<PublicLayout><Projects /></PublicLayout>} />
        <Route path="/projects/:slug" element={<PublicLayout><ProjectDetail /></PublicLayout>} />
        <Route path="/certifications" element={<PublicLayout><Certifications /></PublicLayout>} />
        <Route path="/certifications/:slug" element={<PublicLayout><CertificationDetail /></PublicLayout>} />
        <Route path="/hackathons" element={<PublicLayout><Hackathons /></PublicLayout>} />
        <Route path="/hackathons/:slug" element={<PublicLayout><HackathonDetail /></PublicLayout>} />
        <Route path="/engineering" element={<PublicLayout><Engineering /></PublicLayout>} />
        <Route path="/engineering/:slug" element={<PublicLayout><ArticleDetail /></PublicLayout>} />
        <Route path="/agenda" element={<PublicLayout><Agenda /></PublicLayout>} />

        {/* Routes admin */}
        <Route path="/admin/login" element={<AdminLayout><AdminLogin /></AdminLayout>} />
        <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
        <Route path="/admin/*" element={<AdminLayout><AdminDashboard /></AdminLayout>} />

        {/* Redirect 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

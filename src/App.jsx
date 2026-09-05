import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useAuthStore } from './store/authStore'
import PageTransition from './components/ui/PageTransition'

// Layouts
import PublicLayout from './components/layout/PublicLayout'
import AppShell from './components/layout/AppShell'
import RoleGuard from './components/layout/RoleGuard'

// Public Pages
import LandingPage from './pages/public/LandingPage'
import ScanPage from './pages/public/ScanPage'
import VerifyPage from './pages/public/VerifyPage'
import LoginPage from './pages/public/LoginPage'
import SignupPage from './pages/public/SignupPage'
import OfferingPage from './pages/public/OfferingPage'
import ContactPage from './pages/public/ContactPage'

// Beekeeper Pages
import BeekeeperDashboard from './pages/beekeeper/BeekeeperDashboard'
import HiveDetailPage from './pages/beekeeper/HiveDetailPage'
import BatchRegistrationPage from './pages/beekeeper/BatchRegistrationPage'
import BatchHistoryPage from './pages/beekeeper/BatchHistoryPage'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminBeekeepersPage from './pages/admin/AdminBeekeepersPage'
import AdminBatchesPage from './pages/admin/AdminBatchesPage'

// Lab Pages
import LabPage from './pages/laboratory/LabPage'

// Manufacturer Pages
import ManufacturerPage from './pages/manufacturer/ManufacturerPage'

function ProtectedRoute({ children, allowedRoles }) {
  return (
    <RoleGuard allowedRoles={allowedRoles}>
      {children}
    </RoleGuard>
  )
}

export default function App() {
  const { role } = useAuthStore()
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<PageTransition><LandingPage /></PageTransition>} />
          <Route path="/offering" element={<PageTransition><OfferingPage /></PageTransition>} />
          <Route path="/about" element={<PageTransition><OfferingPage /></PageTransition>} />
          <Route path="/scan" element={<PageTransition><ScanPage /></PageTransition>} />
          <Route path="/verify/:batchId" element={<PageTransition><VerifyPage /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
        </Route>

        <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
        <Route path="/signup" element={<PageTransition><SignupPage /></PageTransition>} />

        {/* Beekeeper Routes */}
        <Route element={<ProtectedRoute allowedRoles={['beekeeper', 'admin']}><AppShell /></ProtectedRoute>}>
          <Route path="/beekeeper" element={<PageTransition><BeekeeperDashboard /></PageTransition>} />
          <Route path="/beekeeper/hive/:hiveId" element={<PageTransition><HiveDetailPage /></PageTransition>} />
          <Route path="/beekeeper/harvest/new" element={<PageTransition><BatchRegistrationPage /></PageTransition>} />
          <Route path="/beekeeper/batches" element={<PageTransition><BatchHistoryPage /></PageTransition>} />
        </Route>

        {/* Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']}><AppShell /></ProtectedRoute>}>
          <Route path="/admin" element={<PageTransition><AdminDashboard /></PageTransition>} />
          <Route path="/admin/beekeepers" element={<PageTransition><AdminBeekeepersPage /></PageTransition>} />
          <Route path="/admin/batches" element={<PageTransition><AdminBatchesPage /></PageTransition>} />
        </Route>

        {/* Lab Routes */}
        <Route element={<ProtectedRoute allowedRoles={['lab', 'admin']}><AppShell /></ProtectedRoute>}>
          <Route path="/lab" element={<PageTransition><LabPage /></PageTransition>} />
        </Route>

        {/* Manufacturer Routes */}
        <Route element={<ProtectedRoute allowedRoles={['manufacturer', 'admin']}><AppShell /></ProtectedRoute>}>
          <Route path="/manufacturer" element={<PageTransition><ManufacturerPage /></PageTransition>} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  )
}

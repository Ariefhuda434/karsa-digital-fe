import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/admin/Dashboard'
import LandingPage from './pages/LandingPage'
import MulaiProyek from './pages/MulaiProyek'
import Portofolio from './pages/PortofolioPages'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"      element={<LandingPage />} />
        <Route path="/pesan" element={<MulaiProyek />} />
        <Route path="/portofolio" element={<Portofolio />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="*" element={<h1 style={{textAlign: 'center', marginTop: '100px'}}>
         404 - Halaman Tidak Ditemukan</h1>} />
      </Routes>
    </BrowserRouter>
  )
}
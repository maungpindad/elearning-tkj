import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Materi from './pages/Materi'
import DetailMateri from './pages/DetailMateri'
import Quiz from './pages/Quiz'
import Simulasi from './pages/Simulasi'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/materi" element={<Materi />} />
          <Route path="/materi/:id" element={<DetailMateri />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/simulasi" element={<Simulasi />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
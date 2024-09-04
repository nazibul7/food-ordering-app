import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './Layouts/Layout'
import HomePage from './pages/HomePage'
import AuthCallbackPage from './pages/AuthCallbackPage'

function App() {
  return (
      <Routes>
        <Route path='/' element={<Layout><HomePage /></Layout>} />
        <Route path='/auth-callback' element={<AuthCallbackPage />} />
        <Route path='/user-profile' element={<p>User profile page</p>} />
        <Route path='*' element={<Navigate to={'/'} />} />
      </Routes>
  )
}
export default App

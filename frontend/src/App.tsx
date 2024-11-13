import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './Layouts/Layout'
import HomePage from './pages/HomePage'
import AuthCallbackPage from './pages/AuthCallbackPage'
import UserProfilePage from './pages/UserProfilePage'
import ProtectedRoute from './auth/ProtectedRoute'
import ManageResturantPage from './pages/ManageResturantPage'
import SearchPage from './pages/SearchPage'
import DetailsPage from './components/DetailsPage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout showHero><HomePage /></Layout>} />
      <Route path='/auth-callback' element={<AuthCallbackPage />} />
      <Route path='/search/:city' element={<Layout showHero={false}><SearchPage /></Layout>} />
      <Route path='/detail/:resturantId' element={<Layout showHero={false}><DetailsPage /></Layout>} />
      <Route element={<ProtectedRoute />}>
        <Route path='/user-profile' element={<Layout showHero={false}><UserProfilePage /></Layout>} />
        <Route path='/manage-resturant' element={<Layout showHero={false}><ManageResturantPage /></Layout>} />
      </Route>

      <Route path='*' element={<Navigate to={'/'} />} />
    </Routes>
  )
}
export default App

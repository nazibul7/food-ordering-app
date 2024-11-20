import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './Layouts/Layout';
import ProtectedRoute from './auth/ProtectedRoute';
import React, { Suspense } from 'react';

const HomePage = React.lazy(() => import('./pages/HomePage'));
const AuthCallbackPage = React.lazy(() => import('./pages/AuthCallbackPage'));
const UserProfilePage = React.lazy(() => import('./pages/UserProfilePage'));
const ManageResturantPage = React.lazy(() => import('./pages/ManageResturantPage'));
const SearchPage = React.lazy(() => import('./pages/SearchPage'));
const DetailsPage = React.lazy(() => import('./components/DetailsPage'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>

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
    </Suspense>
  )
}
export default App

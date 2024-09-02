import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './Layouts/Layout'
import HomePage from './pages/HomePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout><HomePage/></Layout>} />
        <Route path='/user-profile' element={<p>User profile page</p>} />
        <Route path='*' element={<Navigate  to={'/'}/>} />
      </Routes>
    </BrowserRouter>
  )
}
export default App

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import Restaurants from './pages/Restaurants'
import Login from './pages/Login'
import LinkVerify from './pages/LinkVerify'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className='my-4 px-4 w-full'>
          <Header />
          <Routes>
            <Route path='/' element={<Restaurants />} />
            <Route path='/login' element={<Login />} />
            <Route path='user/verify' element={<LinkVerify />} />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

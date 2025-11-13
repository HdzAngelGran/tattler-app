import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Header = () => {
  const { isAuthenticated, logout } = useAuth()
  const location = useLocation()

  return (
    <header className='w-full'>
      <nav>
        <ul className='m-0 p-0 flex flex-row gap-2 align-items-center list-none'>
          <li className='mr-auto'>
            <Link
              to='/'
              className='text-3xl font-semibold no-underline'
              style={{ color: '#8183f4', textDecoration: 'none' }}
            >
              tattler
            </Link>
          </li>
          {isAuthenticated ? (
            <li>
              <button
                onClick={logout}
                className='p-button p-component p-button-text no-underline'
              >
                Logout
              </button>
            </li>
          ) : (
            !['/login', '/signup'].includes(location.pathname) && (
            <>
              <li>
                <Link
                  to='/login'
                  state={{ isLogin: false }}
                  className='p-button p-component no-underline'
                >
                  Signup
                </Link>
              </li>
              <li>
                <Link
                  to='/login'
                  state={{ isLogin: true }}
                  className='p-button p-component p-button-text no-underline'
                >
                  Login
                </Link>
              </li>
            </>
            )
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Header

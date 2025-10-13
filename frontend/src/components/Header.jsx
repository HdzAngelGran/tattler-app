import { Button } from 'primereact/button'

const Header = () => {
  return (
    <header className='w-full'>
      <nav>
        <ul className='m-0 p-0 flex flex-row gap-2 align-items-center list-none'>
          <li className='mr-auto'>
            <span
              className='text-3xl font-semibold'
              style={{ color: '#8183f4' }}
            >
              tattler
            </span>
          </li>
          <li>
            <Button>Signup</Button>
          </li>
          <li>
            <Button text>Login</Button>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header

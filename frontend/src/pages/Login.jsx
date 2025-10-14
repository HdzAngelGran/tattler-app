import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Message } from 'primereact/message'
import { login } from '../services/user'
import { useMutation } from '@tanstack/react-query'

const Login = () => {
  const location = useLocation()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    if (location.state?.isLogin === false) {
      setIsLogin(false)
    } else {
      setIsLogin(true)
    }
  }, [location.state])

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: login,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const userData = isLogin ? { email } : { email, name }
    mutate(userData)
  }

  return (
    <div className='w-full h-full flex flex-column align-items-center justify-content-center'>
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form
        onSubmit={handleSubmit}
        className='flex flex-column gap-4 w-full md:w-6 lg:w-4'
      >
        <div className='p-float-label'>
          <InputText
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type='email'
            className='w-full'
          />
          <label htmlFor='email'>Email</label>
        </div>
        {!isLogin && (
          <div className='p-float-label'>
            <InputText
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className='w-full'
            />
            <label htmlFor='name'>Name</label>
          </div>
        )}
        <Button type='submit' disabled={isPending}>
          {isPending ? 'Sending...' : isLogin ? 'Login' : 'Sign Up'}
        </Button>
      </form>
      {isSuccess && (
        <Message
          severity='success'
          text='Check your email for the login link!'
          className='mt-4'
        />
      )}
      <Button link onClick={() => setIsLogin(!isLogin)} className='mt-4'>
        {isLogin ? 'Need to create an account?' : 'Already have an account?'}
      </Button>
    </div>
  )
}

export default Login

import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ProgressSpinner } from 'primereact/progressspinner'
import { useQuery } from '@tanstack/react-query'
import { verifyToken } from '../services/user'
import { Message } from 'primereact/message'
import { useAuth } from '../context/AuthContext'

const LinkVerify = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const token = new URLSearchParams(location.search).get('token')

  const { isSuccess, data } = useQuery({
    queryKey: ['verifyToken', token],
    queryFn: () => verifyToken(token),
    enabled: !!token,
  })

  useEffect(() => {
    if (isSuccess && data) {
      login(data.token)
      setTimeout(() => {
        navigate('/')
      }, 2000)
    }
  }, [isSuccess, navigate, login, data])

  return (
    <div className='w-full flex flex-column align-items-center gap-4'>
      <h2>Verifying your magic link...</h2>
      <p>
        Please wait while we verify your magic link. You will be redirected
        shortly.
      </p>
      <ProgressSpinner />
      {isSuccess && (
        <Message severity='success' text='Verification successful!' />
      )}
    </div>
  )
}

export default LinkVerify

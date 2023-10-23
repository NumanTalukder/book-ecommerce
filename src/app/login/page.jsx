'use client'

import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import classes from './login.module.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (email === '' || password === '') {
      toast.error('Fill all the fields')
      return
    }

    if (password.length < 4) {
      toast.error('Password length must be at least 4')
      return
    }

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (res?.error === null) {
        router.push('/')
      } else {
        toast.error('Error occured while registering')
        return
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type='email'
            placeholder='Email...'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='Password...'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className={classes.submitButton}>Login</button>
          <button className={classes.loginNow} onClick={() => signIn()}>
            Don&apos;t have an account? <br /> Register Now
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  )
}

export default Login

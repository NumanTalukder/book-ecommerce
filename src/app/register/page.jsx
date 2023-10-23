'use client'

import React, { useState } from 'react'
import classes from './register.module.css'
import { signIn } from 'next-auth/react'
import toast, { Toaster } from 'react-hot-toast'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (username === '' || email === '' || password === '') {
      toast.error('Fill all the fields')
      return
    }

    if (password.length < 4) {
      toast.error('Password length must be at least 4')
      return
    }

    try {
      const res = await fetch('api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      })

      // toast.promise(res, {
      //   loading: 'Loading',
      //   success: (data) => `Successfully saved ${data.username}`,
      //   error: (err) => `This just happened: ${err.toString()}`,
      // })

      if (res.ok) {
        toast.success('Registration Successful')
        setTimeout(() => {
          signIn
        }, 1500)
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
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Username...'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
          <button className={classes.submitButton}>Register</button>
          <button className={classes.registerNow} onClick={() => signIn()}>
            Don&apos;t have an account? <br /> Register Now
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  )
}

export default Register

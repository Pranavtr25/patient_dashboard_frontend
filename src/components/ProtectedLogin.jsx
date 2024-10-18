import React from 'react'
import { Navigate } from 'react-router-dom'
import Login from '../pages/Login'

const ProtectedLogin = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
  return (
    isLoggedIn ? <Navigate to={'/'} /> : <Login/> 
  )
}

export default ProtectedLogin
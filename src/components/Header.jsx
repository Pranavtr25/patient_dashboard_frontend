import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header = ({title}) => {

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.clear('isLoggedIn')
        navigate('/login')
    }

  return (
    <>
        <div className='h-12 sticky top-0 z-10 bg-white shadow-md flex justify-between px-10'>
            <h1 className="text-3xl font-bold text-center mb-6">{title}</h1>
            <div onClick={handleLogout} className='flex items-center bg-blue-400 p-4 rounded-md my-1 text-gray-50 hover:bg-blue-500 cursor-pointer'>
                Logout
            </div>
        </div>
        <div className='flex justify-evenly shadow-md h-10 text-center mt-4'>
            <p className='cursor-pointer hover:text-blue-400 border my-1 rounded-md px-4' onClick={() => navigate('/')}>Dashboard</p>
            <p className='cursor-pointer hover:text-blue-400 border my-1 rounded-md px-4' onClick={() => navigate('/AuthorizationList')}>Request List</p>
        </div>
    </>
  )
}

export default Header
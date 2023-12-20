
import React from 'react'
import { useAuth } from '../Context/AuthContext'
import { Navigate } from 'react-router-dom';

//COMPONENTE PARA RUTAS PROTEGIDAS

function ProtectedRoutes({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <h1>Loading....</h1>

  if (!user) return <Navigate to='/login' />

  return (
    <>
      {children}
    </>
  )
}

export default ProtectedRoutes
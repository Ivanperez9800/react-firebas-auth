// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import AuthProvider from './Context/AuthContext';
import ProtectedRoutes from './Components/ProtectedRoutes';


function App() {

  return (
    
      <AuthProvider>
        <Routes>
          <Route path="/" element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>

          } />
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Register />} />

        </Routes>
      </AuthProvider>

  )
}

export default App

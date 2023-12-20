/*PAGINA A VISTAR CUANDO SE ESTE LOGEADO (PROTEGIDA) */
import React from 'react'
import { useAuth } from '../Context/AuthContext';
import TaskCreate from './TaskCreate';
import TasksProvider from '../Context/TasksProvider';




function Home() {

  const { user, logOut, loading } = useAuth();

  const handleLogout = async () => {
    // console.log(user)
    await logOut()
  }

  if (loading) {

    return <h1>Loading</h1>
  }

  return (
    <div className=' h-screen flex  justify-center items-center  flex-col' >
      <div>Welcome {user.email}</div>
      <button onClick={handleLogout}>Logout</button>


      <TasksProvider>
        <TaskCreate />
      </TasksProvider>




    </div>
  )
}

export default Home
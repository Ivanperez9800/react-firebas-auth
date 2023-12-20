
//TASK PROVIDER SERA PARA LLAMAR A LA BASE DE DATOS


import React, { createContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext';
import { mostrarTareas } from '../Firebase/TasksFirebase';


const TaskContext = createContext();


function TasksProvider({ children }) {

  const [taskList, setTaskList] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);


  

  const { user } = useAuth();

  const fetchData = async () => {
    try {
      const tareas = await mostrarTareas(user.uid);
      setTaskList(tareas);
    } catch (err) {
      console.log(err);
    } finally {
      // Move the setCargando(false) to finally block to ensure it's executed
      setCargando(false);
      setDataLoaded(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <TaskContext.Provider value={{ fetchData, taskList, cargando,dataLoaded }} >
      {children}
    </TaskContext.Provider>
  )
}

export default TasksProvider
export { TaskContext };

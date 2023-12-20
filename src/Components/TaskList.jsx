//COMPONENTE QUE TENDRA EL CONTEXTO Y MANDARA A MOSTAR LA LISTA DE TAREAS PARA CADA USUARIO

import { useContext } from "react";
import { TaskContext } from "../Context/TasksProvider";

import '../Styles/Task.css'
import Task from "./Task";
import { deleteTask } from "../Firebase/TasksFirebase";

function TaskList() {

  const { taskList, dataLoaded } = useContext(TaskContext);
  const {fetchData } = useContext(TaskContext);
  const handleDeleteTask = async (id) => {
    await deleteTask(id)
    alert("Task deleted");
    await fetchData();

  };

  return (

    <div>
      {dataLoaded ? (
        taskList.length ? (
          <div className="task-list">
            <ul>
              {taskList.map(({ data }) => (
                  <Task key={data.id} tarea={data} onDeleteTask={handleDeleteTask} />
              ))}
            </ul>
          </div>
        ) : (
          <p>Sin Tareas</p>
        )
      ) : (
        <p>Cargando...</p>
      )}
    </div>

  )
}

export default TaskList;
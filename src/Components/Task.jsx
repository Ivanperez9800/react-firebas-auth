
//COMPONENTE PARA MOSTRAR 1 TAREA

function Task({ tarea: { id, tarea }, onDeleteTask }) {

  const handleDeleteTask = (id) =>{
    onDeleteTask(id);

  }

  return (
    <>
      <li key={id} >{tarea}</li>
      <button onClick={ () => handleDeleteTask(id)  } >Borrar</button>
    </>


  )
}

export default Task
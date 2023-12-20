//COMPONENTE PARA CREAR TAREAS

//Bibliotecta para gestionar los id automaticos para las tareas creadas
import { v4 as uuidv4 } from 'uuid';


/*PARA MANEJAR EL TEMA DE VALIDACION DE DATOS */
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string, number } from "yup";


/*IMPORT EL CONTEXTO QUE MANEJARA LOS DATOS */

import TasksProvider, { TaskContext } from "../Context/TasksProvider"
import { useAuth } from '../Context/AuthContext';
import { insertarTarea } from '../Firebase/TasksFirebase';
import TaskList from './TaskList';
import { useContext } from 'react';






const schema = object().shape({
    tarea: string().required("El producto es obligatorio")
        .test('not-a-number', 'Las tareas no pueden ser numeros', value => {
            // Verificar que el valor no sea un número
            return isNaN(value);
        })
});

function TaskCreate() {

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });


    //USANDO EL CONTEXTO de USUARIO

    const { user } = useAuth();

    const {fetchData } = useContext(TaskContext);

    const OnSubmitTask = (data, e) => {
        e.preventDefault();
        handleTask(data);
        alert("Producto Añadido!!")
        reset();
    }

    const handleTask = async (data) => {

        try {
            const { tarea } = data;

            const newTask = {
                id: uuidv4(),
                tarea: tarea,
                user: user.uid,
                isCompleted: false
            }

            // console.log(newTask);

            await insertarTarea(newTask);
            await fetchData(); /*ACTUALIZA LA LISTA CADA VEZ QUE SE AGREGA */

        } catch (e) {
            console.log(e.message);
        }

    }


    return (
        <div>

            <form onSubmit={handleSubmit(OnSubmitTask)}>

                <label htmlFor="tarea">Tarea: </label>
                <input type="text"
                    id='tarea'
                    name='tarea'
                    placeholder='Ingrese Tarea'
                    {...register('tarea')}
                />

                {
                    errors &&
                    <p className='error-text' >{errors?.tarea?.message}</p>
                }


                <button>Agregar</button>

            </form>
            {/*COMPONENTE QUE MOSTRARA LAS TAREAS PARA CADA USUARIO */}
                <TaskList />
        </div>
    )
}

export default TaskCreate


import React, { useState } from 'react'

/*HOOK QUE TRAE EL CONTEXTO */
import { useAuth } from '../Context/AuthContext'

/*PARA REDIRECCIONAR */
import { useNavigate } from 'react-router-dom';

/*PARA MANEJAR EL TEMA DE VALIDACION DE DATOS */

import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from "yup";


//COMPOENTE PARA REGISTRARSE

const schema = object().shape({
  email: string()
    .email('Invalid Email Address')
    .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/, 'Invalid Email Address').required("Campo vACIO"),
  password: string().required('Password is required')
            
  ,
});


function Login() {

  const { register, handleSubmit, setError, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  // const [open, setOpen] = useState(false);

  const { login } = useAuth();


  const navigate = useNavigate();


  const handleSubmitUser = async (data, e) => {
    e.preventDefault();
    setError('');

    const { email, password } = data;

    try {

      await login(email, password);
      setError('');
      navigate('/');
    } catch (e) {

      if (e.code === 'auth/invalid-login-credentials') {
        setError('password', {
          type: 'manual',
          message: 'Invalid Email or Password.',
        });

      }

      if (e.code === 'auth/too-many-requests') {
        setError('password', {
          type: 'manual',
          message: "Several attempts have been registered, please try again later"
        })
      }

    }

    setError('')
  }

  return (

    <div className=" h-screen flex justify-center items-center  flex-col ">


      {errors.password && errors?.password?.type !== 'required' &&

        <div id="alert-1" className="relative block w-full p-4 mb-2 text-base leading-5 text-white bg-red-500 rounded-lg opacity-100 font-regular  " role="alert">
          <div className="ms-3 text-sm font-medium text-center ">
           {errors?.password?.message}
          </div>

        </div>

      }

      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(handleSubmitUser)} >

        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  "
            id="email"
            type="text"
            placeholder="Email Address"
            {...register('email')}
          />
          { errors.email &&  <p  className='text-red-500 text-xs italic' > {errors?.email?.message}  </p> }
        </div>
        <div className="mb-6">
          <input
            className="shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline  "
            id="password"
            type="password"
            placeholder="Password"
            {...register('password')}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Log In
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
      </form>
    </div>


  )
}

export default Login;
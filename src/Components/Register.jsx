

import React, { useState } from 'react'
import { useAuth } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';

/*PARA MANEJAR EL TEMA DE VALIDACION DE DATOS */

import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from "yup";


/*IMPORTAR ESTILOS PARA EL FORMULARIO REGISTRO */
import "../Styles/Register.css"

//COMPOENTE PARA REGISTRARSE

const schema = object().shape({
  email: string()
    .email('Invalid email address')
    .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/, 'Invalid Email Address').required("Campo vACIO"),
  password: string().min(6, "Password must be at least 6 characters").required('Password is required')

  ,
});


function Register() {

  const [errorFirebase, setErrorFirebase] = useState();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const { signUp } = useAuth();


  const handleSubmitRegister = async (data, e) => {
    e.preventDefault();

    const { email, password } = data;

    setErrorFirebase('');

    try {

      await signUp(email, password);
      navigate('/');
    } catch (e) {

      if (e.code === 'auth/email-already-in-use') {
        setErrorFirebase("Email is already registered");
      }

      // setError('')
    }


  }

  return (

    <div className="form-card">
      <div className="form-banner">
        <img src="../cv.svg" alt="cv" width="380px" />
      </div>

      <div className="form"  >


        <form onSubmit={handleSubmit(handleSubmitRegister)} >
          {/* <img src="../ProFolioForge.png" alt="" /> */}
          <h1 className='title-form' >Create Account</h1>

          {
            errorFirebase &&
            <div id="alert-1" className="relative block w-full p-4 mb-2 ml-2 text-base leading-5 text-white bg-red-500 rounded-lg opacity-100 font-regular  " role="alert">
              <div className="ms-3 text-sm font-medium text-center ">
                {errorFirebase}
              </div>

            </div>
          }

          <div className="email-card">
            <input type="text"
              name="email"
              id="email"
              placeholder='Email'
              {...register('email')}
            />


            {
              errors  &&
              <p className='error-text' >{errors?.email?.message}</p>
            }
          </div>

          <div className="password-card">
            <input type="password"
              name="password"
              id="password"
              placeholder='Password'
              {...register('password')}
            />

            {
              errors &&
              <p className='error-text' >{errors?.password?.message}</p>
            }

          </div>

          <div className="button-card">
          <button className='button-register' disabled={Object.keys(errors).length > 0}>Sign Up</button>
            <p>Already have an account?<Link to="/login">Login here!</Link></p>
            {/* <a href="https://www.flaticon.es/iconos-gratis/cv" title="cv iconos">Cv iconos creados por Freepik - Flaticon</a> */}
          </div>
        </form>
      </div>
    </div>


  )
}

export default Register
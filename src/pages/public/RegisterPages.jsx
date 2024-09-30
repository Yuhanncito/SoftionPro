import { useEffect, useState } from 'react'
import { RegisterForm } from '../../organisms/LoginForms'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { RegisterFunction } from '../../api'
import Swal from 'sweetalert2'
import { useUserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'

function RegisterPages() {
  const { register, handleSubmit: handleValidateSubmit, formState: { errors } } = useForm()
  const [user, setUser] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    password2: '',
    question: '',
    answer: ''
  })

  const navigate = useNavigate()

  const {
    setMessage,
    setIsMessage,
    setEmail,
    email,
    userDataContext,
    message,
    isMessage,
    setAction
  } = useUserContext();

  const handleSubmit = async (e) => {
    try {

      if(user.password !== user.password2){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Las contraseñas no coinciden",
        });
        return
      }

      const res = await RegisterFunction(user);

      if (res.message === "ok" || res.message === "Tienes un Código Activo") {
        setEmail(user);
        setIsMessage(true);
        setMessage(res.message);
        setAction('register')
        navigate('/verify-email')
      }

      else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res.message, 
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error interno del servidor",
      }) 
    }
  }

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }



  return (
    <div className="flex w-full h-screen ">
      <div className="hidden relative lg:flex h-full lg:w-5/12 items-center justify-center bg-blue-200/20">
        <div className="w-60 h-60 bg-gradient-to-tr from-green-900 to-green-600 rounded-full animate-bounce"/>
        <div className="w-full h-1/2 absolute bottom-0 bg-white/5 backdrop-blur-lg flex justify-center"></div>
      </div>
      <div className="w-full flex items-center justify-center lg:w-7/12 py-4">
        <RegisterForm onChange={handleChange} user={user} validate={register} errors={errors} onSubmit={handleValidateSubmit(handleSubmit)} />
      </div>
      
    </div>
  )
}

export default RegisterPages
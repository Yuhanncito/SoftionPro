import { RestorePassword } from "../../organisms/LoginForms"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useUserContext } from "../../context/UserContext"
import Swal from "sweetalert2"
import { updatePassword } from "../../api"
import Cookies from "universal-cookie"
import { useNavigate } from "react-router-dom"
function RestorePasswordPage() {
  const { register, handleSubmit: handleValidateSubmit, formState: { errors } } = useForm()
  const  {email, token : tokenVerify} = useUserContext()
  const cookie = new Cookies()
  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: email.email,
    password: '',
    confirmPassword: '',
  })


  const token = cookie.get('x-access-user')
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    if(user.password !== user.confirmPassword){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Las contraseñas no coinciden",
      });
      return
    }
    try{
      const res = await updatePassword(tokenVerify,user)

      if(res.message === 'ok'){
       cookie.set('x-access-user', res.token, { path: '/', expires: new Date(Date.now() + 86400000) });
       navigate('/App')
      }
      else{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: token,
        });
      }
    }
    catch(error){
      
    }
  }
  return (
    <div className="flex w-full h-screen ">
      <div className="w-full flex items-center justify-center lg:w-1/2">
      <RestorePassword user={user} onChange={handleChange} validate={register} errors={errors} onSubmit={handleValidateSubmit(handleSubmit)} />
      </div>
      <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200">
        <div className="w-60 h-60 bg-gradient-to-tr from-red-900 to-red-600 rounded-full animate-bounce"/>
        <div className="w-full h-1/2 absolute bottom-0 bg-white/5 backdrop-blur-lg flex justify-center"></div>
      </div>
    </div>
  )
}

export default RestorePasswordPage
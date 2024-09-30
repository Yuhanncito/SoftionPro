import { VerifyEmail } from "../../organisms/LoginForms";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useUserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { VerifyEmail as verifyEmail } from "../../api";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";

function VerifyEmailPage() {
  const { email, isMessage, message, Action, setToken : setTokenVerify  } = useUserContext();
 

  const redirectPage = useNavigate();

  const cookies = new Cookies();

  const [token, setToken] = useState({
    option:'',
    secretCode: "",
    ...email,
  });

  const [pressed, setPressed] = useState(false)


  const { register, handleSubmit: handleValidateSubmit, formState: { errors } } = useForm();
  const handleSubmit = async (e) => {

    setPressed(true);
    
  console.log(token)

    try {
      
      setToken({
        ...token,
        option: Action,
      });
      
      const res = await verifyEmail(token);

      console.log('response del accion verify: ',res)

      if(res.message === 'ok'){

        if(Action === "forgotPassword"){
          setTokenVerify(res.token)
          redirectPage('/restore-password');
        }
        else{
        cookies.set('x-access-user', res.token, { path: '/', expires: new Date(Date.now() + 86400000) });
        redirectPage('/App');
        }
      }
      else{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Respuesta Incorrecta",
        });
      }
    } catch (error) {

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error interno del servidor",
      })
    }
    setPressed(false)
  };


  const handleChange = (e) => {
    setToken({
      ...token,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    if(!email) redirectPage('/')
  },[])


  useEffect(() => {
    setToken({
      ...token,
      option: Action
    })
    console.log("useEffect",token)
  },[Action])

  return (
    <div>
      <div className="flex w-full h-screen ">
        <div className="hidden relative lg:flex h-full lg:w-5/12 items-center justify-center bg-blue-200/20">
          <div className="w-60 h-60 bg-gradient-to-tr from-green-900 to-green-600 rounded-full animate-bounce" />
          <div className="w-full h-1/2 absolute bottom-0 bg-white/5 backdrop-blur-lg flex justify-center"></div>
        </div>
        <div className="w-full flex items-center justify-center lg:w-7/12 py-4">
          <VerifyEmail onPressed={pressed} user={email} isMessage={isMessage} message={message} onChange={handleChange} validate={register} errors={errors} onSubmit={handleValidateSubmit(handleSubmit)} />
        </div>
      </div>
    </div>
  );
}

export default VerifyEmailPage;

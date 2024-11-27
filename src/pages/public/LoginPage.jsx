import { useState, useEffect } from "react";
import { LoginForms } from "../../organisms/LoginForms";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { LoginFunction } from "../../api";
import { useUserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

function LoginPage() {


  const {
    register,
    handleSubmit: handleValidateSubmit,
    formState: { errors },
  } = useForm();
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
  const [pressed, setPressed] = useState(false);
  const redirectPage = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

   

    setPressed(true);
    const res = await LoginFunction(user);

    if (
      res.message === "correcto" ||
      res.message === "Tienes un Código Activo"
    ) {
      setEmail({email:user.email});
      setIsMessage(true);
      setMessage(res.message);
      setAction("Login");
      redirectPage("/verify-email");
    } else {
      setPressed(false)
      Swal.fire({
        title: "Error",
        text: res.message,
        icon: "error",
        confirmButtonText: "Continuar",
        confirmButtonColor: "#3b82f6",
      });
    }
  };


  return (
    <div className="flex w-full h-screen ">
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <LoginForms
          validate={register}
          errors={errors}
          onSubmit={handleValidateSubmit(handleSubmit)}
          user={user}
          onChange={handleChange}
          onPressed = { pressed }
        />
      </div>
      <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200">
      <div className="w-60 h-60 bg-gradient-to-tr from-blue-900 to-blue-600 rounded-full animate-bounce" />
      <div className="w-full h-1/2 absolute bottom-0 bg-white/5 backdrop-blur-lg flex justify-center"></div>
      </div>
    </div>
  );
}
export default LoginPage;

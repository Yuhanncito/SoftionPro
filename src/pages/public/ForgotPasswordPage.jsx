import { useState } from "react";
import { ResetPassword } from "../../organisms/LoginForms";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getUser, SendEmail } from "../../api";
import { useUserContext } from "../../context/UserContext";
import Swal from "sweetalert2";

function ForgotPassword() {
  const { setEmail,setQuestion, setAction } = useUserContext();

  const redirectPage = useNavigate();

  const [user, setUser] = useState({
    email: "",
    recuperacion: "",
  });
  const {
    register,
    handleSubmit: handleValidateSubmit,
    formState: { errors },
  } = useForm();

  const handleSubmit = async (e) => {
    try {
      const res = await getUser(user.email);

      
      if (res.message == "ok") {
        setEmail({email:user.email});
        setQuestion(res.data[0].questionKey[0]);
        setAction("forgotPassword");
        if (user.recuperacion === "token") {
          await SendEmail(user);
          redirectPage("/verify-email");
        } else if (user.recuperacion === "question") {
          redirectPage("/verify-question");
        }
      }
      else{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Usuario no Encontrado",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email not found",
      });
    }
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="flex w-full h-screen ">
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <ResetPassword
          onSubmit={handleValidateSubmit(handleSubmit)}
          validate={register}
          errors={errors}
          onChange={handleChange}
        />
      </div>
      <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200">
        <div className="w-60 h-60 bg-gradient-to-tr from-red-900 to-red-600 rounded-full animate-bounce" />
        <div className="w-full h-1/2 absolute bottom-0 bg-white/5 backdrop-blur-lg flex justify-center"></div>
      </div>
    </div>
  );
}

export default ForgotPassword;

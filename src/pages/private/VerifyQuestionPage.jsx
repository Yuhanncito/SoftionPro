import { VerifyQuestion } from "../../organisms/LoginForms";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUser, VerifyQuestion as verifyQuestion, SendEmail} from "../../api";
import { useUserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function VerifyQuestionPage() {
  const { email, question } = useUserContext();

  const redirectPage = useNavigate();

  const [answer, setAnswer] = useState({
    answer: "",
    email: email.email,
    question: "",
  });

  const {
    register,
    handleSubmit: handleValidateSubmit,
    formState: { errors },
  } = useForm();
  const handleSubmit = async (e) => {
    try {
      const res = await verifyQuestion(answer);
      console.log(res)
      if(res.message === 'ok'){
        const resp = await SendEmail(email);
        if(resp.message === 'correcto'){
          redirectPage('/verify-email');
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
      
    }
  };

  const handleChange = (e) => {
    setAnswer({
      ...answer,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    if (question) {
      setAnswer({
        ...answer,
        question: question.key,
      });
    }
  }, [question]);

  useEffect(() => {
    console.log("question verify",question)
  }, [question]);

  return (
    <div>
      <div className="flex w-full h-screen">
        <div className="hidden relative lg:flex h-full lg:w-5/12 items-center justify-center bg-blue-200/20">
          <div className="w-60 h-60 bg-gradient-to-tr from-green-900 to-green-600 rounded-full animate-bounce" />
          <div className="w-full h-1/2 absolute bottom-0 bg-white/5 backdrop-blur-lg flex justify-center"></div>
        </div>
        <div className="w-full flex items-center justify-center lg:w-7/12 py-4">
          <VerifyQuestion
            user={question}
            onChange={handleChange}
            validate={register}
            errors={errors}
            onSubmit={handleValidateSubmit(handleSubmit)}
          />
        </div>
      </div>
    </div>
  );
}

export default VerifyQuestionPage;

import { Title, SubTitle, Text } from "../atoms/TextsGlobal";
import { FormsImputs } from "../molecules/FormsImputs";
import { Buttons, Redirect } from "../atoms/FormularyItems";
import { useNavigate } from "react-router-dom";
import {LoadingMolecule} from '../molecules/LoadingMolecule'

export function LoginForms({ onSubmit, onChange, validate, errors, onPressed }) {
  return (
    onPressed ? <LoadingMolecule /> : <div className="bg-white px-10 py-20 md:w-[600px] rounded-3xl shadow-xl border-2 border-gray-100">
    <Title text="Bienvenido a" />
    <SubTitle text="Softion Pro" />
    <div className="mt-8">
      <form onSubmit={onSubmit}>
        <FormsImputs
          type={"email"}
          label="Email"
          text="Ingresa tu Email"
          onChange={onChange}
          id="email"
          validate={validate}
        />
        {
          errors.email && <p className="text-red-500">{errors.email.message}</p>
        }
        <FormsImputs
          type={"password"}
          label="Password"
          text="Ingresa tu Password"
          onChange={onChange}
          id="password"
          validate={validate}
        />
        {
          errors.password && <p className="text-red-500">{errors.password.message}</p>
        }
        <div className="flex justify-between items-center mt-5">
          <Redirect
            text="¿Olvidaste tu Contraseña?"
            route="/reset-password"
          />
        </div>
        <div className="flex justify-center items-center mt-5 w-full">
          <Redirect text="¿No tienes una cuenta?" route="/register" />
        </div>
       
        <Buttons text="Iniciar Sesion" />
      </form>
    </div>
  </div>
  );
}

export const RegisterForm = ({ onSubmit, onChange, validate, errors, user }) => {

  const navigate = useNavigate();

  const options = [
    {
      value: "default",
      text: "Selecciona tu pregunta",
    },
    {
      value: "colorFavorito",
      text: "¿Cuál es tu color favorito?",
    },
    {
      value: "nombreMascota",
      text: "¿Cómo se llama tu primera mascota?",
    },
    {
      value: "ciudadNacimiento",
      text: "¿En qué ciudad naciste?",
    },
    {
      value: "comidaFavorita",
      text: "¿Cuál es tu comida favorita?",
    },
  ];
  return (
    <div className="flex w-full items-center justify-center">
      <form
        method="POST"
        onSubmit={onSubmit}
        className="flex w-[90%] rounded-xl shadow-2xl bg-white max-sm:px-5 px-16 py-10  flex-col items-center justify-center"
      >
        <h1 className="max-sm:text-3xl text-5xl font-semibold text-center">
          Registro
        </h1>
        <FormsImputs
          type="text"
          label="Nombre"
          text="Nombre"
          onChange={onChange}
          id="name"
          validate={validate}
        />
        {
          errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>
        }

        <FormsImputs
          type="text"
          label="Apellido"
          text="Apellido"
          onChange={onChange}
          id="lastName"
          validate={validate}
        />
        {
          errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>
        }

        <FormsImputs
          type="email"
          label="Email"
          text="Email"
          onChange={onChange}
          id="email"
          validate={validate}
        />
        {
          errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>
        }
        <FormsImputs
          type="password"
          label="Contraseña"
          text="Contraseña"
          onChange={onChange}
          id="password"
          validate={validate}
        />
        {
          errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>
        }
        <FormsImputs
          type="password"
          label="Confirmar contraseña"
          text="Confirmar contraseña"
          onChange={onChange}
          id="password2"
          validate={validate}
        />
        {
          errors.password2 && <p className="text-red-500 text-sm">{errors.password2.message}</p>
        }
        <FormsImputs
          type="select"
          label="Pregunta Secreta"
          text="Preguntas"
          onChange={onChange}
          id="secret"
          options={options}
          validate={validate}
        />
        {
          errors.question && <p className="text-red-500 text-sm">{errors.question.message}</p>
        }
        <FormsImputs
          type="text"
          label="Respuesta"
          text="Respuesta"
          onChange={onChange}
          id="respuestaSecreta"
          validate={validate}
        />
        {
          errors.answer && <p className="text-red-500 text-sm">{errors.answer.message}</p>
        }

        <FormsImputs 
          type="checkbox"
          text="Terminos y politas de privacidad"
          onChange={onChange}
          id="captcha"
          validate={validate}
          navigate={() => navigate('/privacy-policies')}
        />

        { errors.captcha && <p className="text-red-500 text-sm">{errors.captcha.message}</p> }

        <Buttons text="Registrarse" />
        <Redirect text="Ya tengo cuenta" route="/" />
      </form>
    </div>
  );
};

export const ResetPassword = ({ onSubmit, onChange, validate, errors, user }) => {
  const options = [
    {
      value: "default",
      text: "Metodo de recuperacion",
    },
    {
      value: "token",
      text: "Recuperacion por Correo",
    },
    {
      value: "question",
      text: "Recuperacion por Pregunta Secreta",
    }
  ];
  return (
    <div className="w-full h-full flex items-center justify-center">
      <form
        onSubmit={onSubmit}
        className="w-[70%] max-sm:w-[90%] max-sm:h-[80%] h-[70%] flex rounded-xl shadow-2xl bg-white max-sm:px-5 px-16 py-10 flex-col items-center justify-center"
      >
        <div className="w-full mb-3">
          <Title text="Restablecer contraseña" />
        </div>
        <div className="w-full mb-2">
          <Text text="Se le enviará al correo un token para restablecer su contraseña" />
        </div>
        <FormsImputs
          type="email"
          label="Email"
          text="Email"
          onChange={onChange}
          id="email"
          validate={validate}
        />
        {
          errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>
        }
        <FormsImputs
          type="select"
          label="Recuperacion"
          text="Recuperacion"
          onChange={onChange}
          id="recuperacion"
          options={options}
          validate={validate}
        />
        {
          errors.recuperacion && <p className="text-red-500 text-sm">{errors.recuperacion.message}</p>
        }
        <Buttons text="Recuperar contraseña" />
        <Redirect text="Volver al Inicio de sesion" route="/" />
      </form>
    </div>
  );
};

export const VerifyEmail = ({ user, onSubmit, onChange, validate, errors, isMessage, message, onPressed }) => {
  return (
    onPressed ? <LoadingMolecule /> :<div className="w-full h-full flex items-center justify-center">
    <form onSubmit={onSubmit} className="w-[70%] max-sm:w-[90%] max-sm:h-[80%] h-[70%] flex rounded-xl shadow-2xl bg-white max-sm:px-5 px-16 py-10 flex-col items-center justify-center">
      <div className="w-full mb-3">
        <Title text="Token de verificación" />
      </div>
      <div className="w-full mb-2">
        <Text text={isMessage? (message!=='ok')? message + " en su bandeja de entrada":"Se ah enviado un token a su correo electronico" :''} />
      </div>
      <FormsImputs
        type="text"
        label="Ingresa el token enviado al correo"
        text="Ejemplo: 123sdf56"
        onChange={onChange}
        id="secretCode"
        validate={validate}
      />
      <Buttons text="Verificar correo" />
      <Redirect text="Volver al Inicio de sesion" route="/" />
    </form>
  </div>
  );
};

export const RestorePassword = ({ onSubmit, onChange, validate, errors }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <form onSubmit={onSubmit} className="w-[70%] max-sm:w-[90%] max-sm:h-[80%] h-[70%] flex rounded-xl shadow-2xl bg-white max-sm:px-5 px-16 py-10 flex-col items-center justify-center">
        <div className="w-full mb-3">
          <Title text="Restablecer contraseña" />
        </div>
        <div className="w-full mb-2">
          <Text text="Escriba una nueva contraseña para poder iniciar sesion nuevamente" />
        </div>
        <FormsImputs
          type="password"
          label="Nueva contraseña"
          text="Nueva contraseña"
          onChange={onChange}
          id="password"
          validate={validate}
        />
        {
          errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>
        }
        <FormsImputs
          type="password"
          label="Confirmar contraseña"
          text="Confirmar contraseña"
          onChange={onChange}
          id="confirmPassword"
          validate={validate}
        />
        {
          errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
        }
        <Buttons text="Restablecer contraseña" />
        <Redirect text="Volver al Inicio de sesion" route="/" />
      </form>
    </div>
  );
}

export const VerifyQuestion = ({ user, onSubmit, onChange, validate, errors }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <form onSubmit={onSubmit} className="w-[70%] max-sm:w-[90%] max-sm:h-[80%] h-[70%] flex rounded-xl shadow-2xl bg-white max-sm:px-5 px-16 py-10 flex-col items-center justify-center">
        <div className="w-full mb-3">
          <Title text="Verificar pregunta" />
        </div>
        <div className="w-full mb-2">
          <SubTitle text={"Pregunta: " + user.question} />
        </div>
        <div className="w-full mb-2">
          <Text text="Escriba la respuesta para poder restarablecer tu contraseña" />
        </div>
        <FormsImputs
          type="text"
          label="Respuesta"
          text="Respuesta"
          onChange={onChange}
          id="answer"
          validate={validate}
        />
        {
          errors.answer && <p className="text-red-500 text-sm">{errors.answer.message}</p>
        }
        <Buttons text="Verificar respuesta" />
        <Redirect text="Volver al Inicio de sesion" route="/" />
      </form>
    </div>
  );
}

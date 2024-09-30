import { useState } from "react";
import { BiShow } from "react-icons/bi";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
export const Inpusts = ({ type, text, onChange, value , id, validate }) => {
  const {Theme} = useUserContext()
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={`w-full flex border-2 border-gray-100 rounded-xl bg-transparent ${Theme? '' : 'bg-white' } `}>
      <input
        className="w-full bg-transparent p-4 h-full"
        type={type === "password" && !showPassword ? "password" : type == 'number' ? 'number' : "text"}
        placeholder={text}
        {...validate(id, {
          required: "Este campo es requerido",
          pattern:
            type === "email"
              ? { value: /^\S+@\S+$/i, message: "Email no valido" }
              : type === "password"
              ? {
                  value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                  message: "Contraseña no valida",
                }
              : type === "name"
              ? { value: /^[a-zA-Z\s]*$/, message: "Solo se permiten letras" }
              : type === "lastName"
              ? { value: /^[a-zA-Z\s]*$/, message: "Solo se permiten letras" }
              :  null,
        })}
        onChange={onChange}
        id={id}
        name={id}
        value={value}
      />
      {type === "password" && (
        <div className="w-10  flex items-center justify-center">
          {type === "password" && showPassword ? (
            <FaRegEyeSlash
              onClick={() => setShowPassword(!showPassword)}
              className="text-2xl h-full cursor-pointer"
            />
          ) : (
            <BiShow
              onClick={() => setShowPassword(!showPassword)}
              className="h-full text-2xl cursor-pointer"
            />
          )}
        </div>
      )}
      
    </div>
  );
};

export const DataInput = ({ text, onChange, value, validate, id}) => {
  return (
    <input
    className="w-full bg-transparent p-4 h-full"
    type="date"
    name={id}
    onChange={onChange}
  />  
  );
};

export const Labels = ({ text, to }) => {
  return (
    <label className="text-lg font-medium" htmlFor={to}>
      {text}
    </label>
  );
};

export const Buttons = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className=" disabled:bg-blue-100 disabled:cursor-not-allowed  active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-blue-600 text-white text-lg font-bold w-[100%]">
      {text}
    </button>
  );
};

export const Selects = ({ text, onChange, options, validate, id }) => {
  return (
    <select id={id} name={id}  {...validate(id,{
      require: "Este campo es requerido",
      validate: value => value !== "default" || "Por favor seleccione una opción",
    })} className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent" onChange={onChange}>
      {options.map((option, key) => (
        <option key={key} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
};

export const Checkboxes = ({ text, id, navigate, onChange, }) => {
  return (
    <div className={`flex items-center gap-2`}  >
      <input id={id} name={id} type="checkbox" onChange={onChange} />
      <label htmlFor={id} onClick={navigate} className={`text-lg font-medium ${navigate? 'cursor-pointer hover:text-blue-600 ':'' }`}>
        {text}
      </label>
    </div>
  );
};

export const RadiosButtons = ({ text, id, options }) => {
  return (
    <div className="flex items-center gap-2 max-sm:flex-col mt-2">
      {options.map((option, key) => (
        <div key={key} className="flex items-center gap-2 w-full">
          <input
            id={option.value}
            name={id}
            type="radio"
            value={option.value}
            defaultChecked={key === 0}
          />
          <label htmlFor={option.value} className="text-lg font-medium">
            {option.text}
          </label>
        </div>
      ))}
    </div>
  );
};

export const Redirect = ({ text, route }) => {
  return (
    <Link to={route} className="text-lg font-medium text-blue-600">
      {" "}
      {text}
    </Link>
  );
};

export const EditInput = ({ onChange, value, id, type, text }) => {
  const { Theme } = useUserContext();
  return (
    <div className={`w-full flex border-2 border-gray-100 rounded-xl bg-transparent ${Theme? '' : 'bg-white' } `}>
      <input
        className="w-full bg-transparent p-4 h-full"
        type={type === "password" && !showPassword ? "password" : type == 'number' ? 'number' : "text"}
        placeholder={text}
        onChange={onChange}
        id={id}
        name={id}
        value={value}
      />
    </div>
  );
};
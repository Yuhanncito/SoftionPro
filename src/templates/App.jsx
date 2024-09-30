import React from "react";
import { FaEdit, FaUser } from "react-icons/fa";

const DatosPersonales = () => {
  return (
    <div className="w-screen h-screen bg-black text-white flex justify-center items-center flex-col">
      <div className="w-2/3 h-2/3 flex flex-col justify-center  ">
        <div className="w-full flex py-5  items-center justify-center">
          <h2 className="flex items-center px-10 py-2 text-4xl font-bold">
            Datos personales
            <FaUser className="ml-3 text-white w-10 h-10" />
          </h2>
        </div>
        <div className="flex p-2  items-center justify-center ">
          <div className="w-7/12 flex justify-between items-center">
            <div className="px-5 h-auto  w-6/12 py-5 flex flex-col justify-between ">
              <label htmlFor="username" className="text-sm my-2">
                Nombre de usuario
              </label>
              <div className="flex bg-gray-700 items-center rounded-md overflow-hidden">
                <input
                  type="text"
                  id="username"
                  value="Alberto"
                  readOnly
                  className="py-2 px-4 w-full bg-transparent text-white"
                />
                <FaEdit className="mr-4 text-gray-400 cursor-pointer hover:text-white transition-colors duration-200 ease-in-out" />
              </div>
            </div>
            <div className="px-5 h-auto  w-6/12 py-5 flex flex-col justify-between ">
              <label htmlFor="phone" className="text-sm my-2">
                Número telefónico
              </label>
              <div className="flex bg-gray-700 items-center rounded-md overflow-hidden">
                <input
                  type="text"
                  id="phone"
                  value="+7712516985"
                  readOnly
                  className="py-2 px-4 w-full bg-transparent text-white"
                />
                <FaEdit className="mr-4 text-gray-400 cursor-pointer hover:text-white transition-colors duration-200 ease-in-out" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex  p-2  items-center justify-center">
          <div className="px-5 h-auto w-7/12 flex flex-col justify-between ">
            <label htmlFor="email" className="text-sm my-2">
              Correo electrónico
            </label>
            <div className="flex bg-gray-700 items-center rounded-md overflow-hidden">
              <input
                type="text"
                id="email"
                value="20211020@uthh.edu.mx"
                readOnly
                className="py-2 px-4 w-full bg-transparent text-white"
              />
              <FaEdit className="mr-4 text-gray-400 cursor-pointer hover:text-white transition-colors duration-200 ease-in-out" />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center p-2">
          <div className="w-7/12 px-5">
          <h4 className="text-white text-sm my-2">Eliminar cuenta</h4>
          <button className="bg-red-500 text-white px-16 py-2 rounded-md">
            Eliminar
          </button></div>
        </div>
      </div>
    </div>
  );
};

export default DatosPersonales;

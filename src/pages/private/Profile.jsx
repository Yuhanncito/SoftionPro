import React, { useEffect, useState } from "react";
import {
  Title,
  SubTitle,
  GlobalText,
  SmallText,
} from "../../atoms/TextsGlobal";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { getQuestion } from "../../api";
import { useUserContext } from "../../context/UserContext";
import { HiOutlineCamera } from "react-icons/hi2";
import { Buttons } from "../../atoms/FormularyItems";
function Profile() {
  const { Theme } = useUserContext();
  const UseQuery = useQueryClient();
  const [user, setUser] = useState(UseQuery.getQueryData(["userData"]));
  const [PassUpdate, setPassUdpate] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const texto = "hola";

  const { data, isLoader } = useQuery({
    queryFn: () => getQuestion(user.user.questionKey),
    queryKey: ["question"],
  });

  return (
    <div className="w-4/6 mx-auto  h-full justify-center items-center p-5 flex">
      <div className={`p-10 w-full flex flex-col items-center`}>
        <div className=" rounded-full p-3 border-b-4 relative -mb-14 ">
          <img
            src="/images/Profile/profile.jpg"
            alt=""
            className={`w-44 h-44 rounded-full text-white`}
          />
          <HiOutlineCamera className=" cursor-pointer w-10 h-10 rounded-full p-2 bg-black text-white bottom-0 right-0 absolute " />
        </div>
        <div
          className={` ${
            Theme ? " border-2 border-gray-700 " : "bg-gray-100"
          } rounded-lg shadow-xl py-16 px-10 w-7/12 `}
        >
          <div className=" flex p-1 border w-full justify-between bg-gray-200 rounded-lg ">
            <div
              className={` w-6/12 cursor-pointer rounded-lg text-center font-bold p-1 ${
                !PassUpdate ? "bg-white" : ""
              } `}
              onClick={() => setPassUdpate(false)}
            >
              Informacion personal
            </div>
            <div
              className={` w-6/12 cursor-pointer  rounded-lg text-center font-bold p-1 ${
                PassUpdate ? "bg-white" : ""
              }`}
              onClick={() => setPassUdpate(true)}
            >
              Contraseña
            </div>
          </div>
          <div className=" ">
            {!PassUpdate ? (
              <PersonalInfo
                user={user}
                isEditing={isEditing}
                setEditing={setEditing}
              />
            ) : (
              <PassUpdateView user={user} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

export const PersonalInfo = ({ user, isEditing, setEditing }) => {
  return (
    <>
      <div className="flex w-full justify-evenly border-b-2 mt-5">
        <div className="flex w-full flex-col items-center">
          {isEditing ? (
            <div className="flex w-full flex-row" >
              <input type="text" value={`${user.user.name.toUpperCase()}`} />
              <input
                type="text"
                name=""
                id=""
                value={user.user.lastName.toUpperCase()}
              />
            </div>
          ) : (
            <SubTitle
              text={`${
                user.user.name.toUpperCase() + " " + user.user.lastName
              }`}
            />
          )}
          <GlobalText text={user.user._id} />
        </div>
      </div>

      <div className="flex w-full px-5 justify-evenly items-center border-b-2 py-4 mb-4">
        <div className="text-center">
          <SubTitle text={`Tengo una pregunta para ti:`} />
          <GlobalText text={user.user.questionKey.question} />
        </div>
      </div>

      <div className="flex w-full px-5 justify-evenly items-center border-b-2 py-4 mb-4">
        <div className="text-center">
          <SubTitle text={`El correo registrado es:`} />
          <GlobalText text={user.user.email} />
        </div>
      </div>

      <div className=" w-full flex flex-row justify-between ">
        <div className="w-3/12">
          <Buttons
            onClick={() => {
              setEditing(true);
            }}
            text={"Editar"}
          />
        </div>
        <div className="w-3/12">
          {isEditing ? (
            <Buttons
              onClick={() => {
                setEditing(false);
              }}
              text={"Cancelar"}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

export const PassUpdateView = ({ user }) => {
  return (
    <>
      <div className="flex w-full justify-evenly border-b-2 mt-5">
        <div className="flex flex-col items-center w-full p-2">
          <SubTitle text={" Contraseña Actual "} />
          <input type="password" name="" id="" className=" w-full p-2 rounded-lg border-2 " />
        </div>
      </div>

      <div className="flex w-full px-5 justify-evenly items-center border-b-2 py-4 mb-4">
        <div className="text-center w-full">
          <SubTitle text={`Contraseña Nueva`} />
          <input type="password" name="" id="" className=" w-full p-2 rounded-lg border-2 " />
        </div>
      </div>

      <div className="flex w-full px-5 justify-evenly items-center border-b-2 py-4 mb-4">
        <div className="text-center w-full">
          <SubTitle text={`Confirmar Contraseña`} />
          <input type="password" name="" id="" className=" w-full p-2 rounded-lg border-2 "/>
        </div>
      </div>

      <div className=" w-3/12 ">
        <Buttons
          onClick={() => {
            alert("Hola");
          }}
          text={"Actualizar"}
        />
      </div>
    </>
  );
};

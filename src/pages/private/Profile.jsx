import React, { useEffect, useState, useCallback } from "react";
import Webcam from "react-webcam";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import { MdModeEditOutline } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import {
  Title,
  SubTitle,
  GlobalText,
  SmallText,
  Text,
} from "../../atoms/TextsGlobal";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { getQuestion, getUserData } from "../../api";
import { useUserContext } from "../../context/UserContext";
import { Buttons } from "../../atoms/FormularyItems";
import { uploadProfileImagen } from "../../api";
function Profile() {
  const cookies = new Cookies();
  const token = cookies.get("x-access-user");
  const { Theme } = useUserContext();

  const [ImagenUrl, setImagenUrl] = useState(null);
  const [isUpload, setIsUpload] = useState(false);
  const [isPhoto, setIsPhoto] = useState(false);
  const [devices, setDevices] = useState([]);
  const [camSelected, setCamSelected] = useState(null);
  const [image, setImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [ShowWebcam, setShowWebcam] = useState(false);
  const [PassUpdate, setPassUdpate] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const queryClient = useQueryClient();

  const cld = new Cloudinary({ cloud: { cloudName: 'dhuutno2p' } });

  const [user , setUser] = useState(null);


  const handleDevices = useCallback((mediaDevices) => {
    setDevices(mediaDevices.filter(({ kind }) => kind === 'videoinput'));
  }, [setDevices]);

  useEffect(() => {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      navigator.mediaDevices.enumerateDevices().then(handleDevices);
    } else {
      console.log('La enumeración de dispositivos no está permitida en direcciones IP.');
    }
  }, [handleDevices]);

  useEffect(() => {
    const fetchUserData = async () => {
      const datas =  queryClient.getQueryData(["userData"]);
      setUser(datas);
      console.log(datas)
    };
    fetchUserData();
  }, [token]);
 

  const handleImageUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      setIsPhoto(false);
      setImage(event.target.files[0])
    }
  }

  const handleUpload = async () => {
    if(!image){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, selecciona una imagen',
      })
      return
    }

    if (isPhoto) {
      const result = await uploadProfileImagen(token, image);
      setImagenUrl(result.url);
      Swal.fire({
        icon: 'success',
        title: '¡Listo!',
        text: 'Tu imagen de perfil ha sido actualizada',
      })
      setImage(null);
      setShowModal(false);
      
    setIsUpload(true);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(image);

    reader.onload = async () => {
      const base64String = reader.result;
      try{  
        const result = await uploadProfileImagen(token, base64String);
        setImagenUrl(result.url);
        Swal.fire({
          icon: 'success',
          title: '¡Listo!',
          text: 'Tu imagen de perfil ha sido actualizada',
        })
        setImage(null);
        setShowModal(false);
        
    setIsUpload(true);
      }catch(error){
        console.log(error)
      }
    };
    
    setIsUpload(false);
    await queryClient.invalidateQueries(["userData"]);
  }

  useEffect(() => {
    if (user) {
      setImagenUrl(user.user.profileImage);
    }
  }, [isUpload]);

  return (
    user  === null ? <div>Cargando...</div> :
    <div className="w-5/6 mx-auto  h-[90vh  ] justify-center items-center p-5 flex">
      <div className={`p-10 w-full flex flex-col items-center`}>
        <div className=" rounded-full p-3 border-b-4 relative -mb-14 ">
        <AdvancedImage cldImg={cld
  .image(user.user.profileImage)
  .format('auto')
  .quality('auto')
  .resize(auto().gravity(autoGravity()).width(500).height(500))} className={`w-44 h-44 rounded-full text-white`}/>
          <MdModeEditOutline onClick={() => setShowModal(true)} className=" cursor-pointer w-10 h-10 rounded-full p-2 bg-black text-white bottom-0 right-0 absolute " />
        </div>

        {
          showModal ? (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-10 bg-black bg-opacity-50">
              <div className="bg-white w-1/3 p-5 rounded-lg">
                <div className="flex justify-between">
                  <SubTitle text="Editar Foto de Perfil" />
                  <IoMdCloseCircleOutline onClick={() => [setShowModal(false) , setImage(null)]} className="cursor-pointer w-10 h-10 rounded-full bg-red-500 text-white" />
                </div>
                <div className=" flex w-full items-center justify-evenly flex-col">
                  <div className=" w-full flex flex-col py-3 items-center border-b-2 ">
                    <SubTitle text="Seleccionar una imagen" />
                    <input onChange={handleImageUpload} type="file" name="" id="" className=" w-full mt-2 p-2 rounded-lg border-2 " />
                  </div>
                  <div className=" w-full px-5 ">
                    {
                      image ? (
                        <div className=" w-full p-2 rounded-lg border-2 ">
                          <img src={ isPhoto ? image :  URL.createObjectURL(image)} alt="" className="w-full h-full" />
                        </div>
                      ) : null
                    }
                  </div>
                  <div className=" w-full px-5 ">
                    <button onClick={() => setShowWebcam(true)} className=" w-full p-2 rounded-lg border-2 bg-blue-500 text-white "> Tomar una Foto </button>
                  </div>
                  <div className=" w-full px-5 ">
                    <button onClick={handleUpload} className=" w-full p-2 rounded-lg border-2 bg-green-500 text-white "> Guardar </button>
                  </div>
                </div>
              </div>
            </div>
          ) : null
        }

        {
          ShowWebcam ? (
            <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center z-10 bg-black bg-opacity-50">
              <div className="bg-white w-1/3 p-5 rounded-lg">
                <div className="flex justify-between">
                  <SubTitle text="Tomar Foto" />
                  <IoMdCloseCircleOutline onClick={() => setShowWebcam(false)} className="cursor-pointer w-10 h-10 rounded-full bg-red-500 text-white" />
                </div>
                <div className=" flex w-full items-center justify-center flex-col">
                  <Webcam audio={false} videoConstraints={{ deviceId: camSelected}} screenshotFormat="image/jpeg">
                  {({ getScreenshot }) => (
                <button
                  onClick={() => {
                    setIsPhoto(true);
                    setShowWebcam( false )
                    const imageSrc = getScreenshot()
                    setImage(imageSrc);
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-xs mt-2"
                >
                  Capturar foto
                </button>
              )}
                  </Webcam>
                </div>
                <div className=" w-full py-2">
                  <Text text="Dispositivos de captura" />
                  <select onChange={(e) => setCamSelected(e.target.value)} className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent">
                    {devices.map((device) => (
                      <option key={device.deviceId} value={device.deviceId}>
                        {device.label}
                      </option>
                    ))}
                  </select>
                
                </div>
                <button className=" w-full p-2 rounded-lg border-2 bg-red-500 text-white "  onClick={() => setShowWebcam(false)} > Cancelar </button>
              </div>
            </div>
          ) : null
        }

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

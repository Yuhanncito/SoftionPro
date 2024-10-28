import { Outlet, useNavigate, redirect } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { LoadingMolecule } from "../molecules/LoadingMolecule";
import { useState, useEffect, useRef } from "react";
import Cookies from "universal-cookie";
import SliderBar from "../organisms/SliderBar";
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import Breadcrumb from "../molecules/Breadcrumbs";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { IoIosNotificationsOutline } from "react-icons/io";
import { getUserData, getWorkSpaces, getInvitations, acceptInvitation } from "../api";
import Swal from "sweetalert2";
function LayoutPrivate() {
   
  const {
    email,
    setWorkspaces,
    setTheme: globalTheme,
    Theme,
  } = useUserContext();
  const [user, setUser] = useState(false);
  const [isToken, setIsTooken] = useState(false);
  const [theme, setTheme] = useState(false);
  const [OpenInvitation, setOpenInvitation] = useState(false);
  const redirectPage = useNavigate();
  const cookie = new Cookies();
  const wrapperRef = useRef(null);

  const token = cookie.get("x-access-user");

  const queryClient = useQueryClient({
  });

  const {
    data: userToken,
    isLoading,
    isError: isErrorUser,
    error: errorUser,
  } = useQuery({
    queryKey: ["userData"],
    queryFn: () => getUserData(token),
    onSuccess: (data) => {
      setUser(data);
      console.log("user", data);
      if (!data  || data.message) {
        redirectPage("/login");
        cookie.remove("x-access-user");
      }
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No token Provider",
      })
    },
  });

  const { data: workspaces, isLoading: isLoadingWorkspaces } = useQuery({
    queryKey: ["workspaces"],
    queryFn: () => getWorkSpaces(token),
    onSuccess: (data) => {
      setWorkspaces(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { data: invitations, isLoading: isLoadingInvitations, isSuccess: isSuccessInvitations } = useQuery({
    queryKey: ["invitations"],
    queryFn: () => getInvitations(userToken.user._id, token),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleVerify = async (token, email) => {
    !token && !email ? redirectPage("/") : null;
    token ? setIsTooken(true) : setIsTooken(false);
  };

  const handleChangeTheme = () => {
    globalTheme(!theme);
    setTheme(!theme);
  };

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setOpenInvitation(false);
    }
  };

  useEffect(() => {
    handleVerify(token, email);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const ViewNotifications = (notification, titulo) => {
    Swal.fire({
        title: titulo,
        background: Theme ? "#1f2937" : "#fff",
        color: Theme ? "#fff" : "#545454",
        text: `${notification.idPropietary.name} te ha invitado para unirse a su Workspace`,
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#3085d6",
        cancelButtonText: "Salir",
        denyButtonText: "Cancelar",
        showDenyButton: true,
        showCancelButton: true,
        focusConfirm: false,
    }).then( async (result) => {
        if (result.isConfirmed) {
            handleAceptInvitation(notification._id)
        }

        if (result.isDenied) {
            alert("deny")
        }

      })
}

const acceptMutation = useMutation({
    mutationFn: async (id) => await acceptInvitation(id,token),
    onSuccess: async (data) => {
        await queryClient.invalidateQueries(["invitations"])
        await queryClient.invalidateQueries(["workspaces"])
    }
})

const handleAceptInvitation = async (notification) => {
    await acceptMutation.mutateAsync(notification)  
}

const handleDestroy = () => {
    cookie.remove("x-access-user");
    redirectPage("/");
};

  return token ?  (
    (isLoadingWorkspaces || isLoading) ? (
      <LoadingMolecule />
    ) :  (
      <div
        className={` transition-all duration-1000 w-screen h-screen flex flex-row ${
          Theme ? "bg-gray-900 text-white" : " bg-slate-50"
        }`}
      >
        <SliderBar
          user={isLoading ? "" : userToken.user}
          userLoading={isLoading}
          workspaces={workspaces ? workspaces : []}
        />
        <div className=" w-full h-full flex flex-col ">
          <div
            className={`flex flex-col shadow-lg h-auto ${
              Theme ? " shadow-gray-800 " : ""
            }`}
          >
            <div
              className={` flex w-full border-b-2 h-full ${
                Theme ? "border-gray-800 " : "border-gray-200 bg-white"
              }`}
            >
              <div className="flex w-4/12 ">
                <Breadcrumb data={workspaces} />
              </div>
              <div className="flex w-8/12 justify-end">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => setOpenInvitation(!OpenInvitation)}
                >
                  <IoIosNotificationsOutline className="w-8 h-8 mr-5" />
                  {invitations && invitations.invitations.length > 0 ? (
                    <div className=" absolute top-1 rounded-full bg-red-400 text-white w-4 h-4 items-center"></div>
                  ) : null}

                  {OpenInvitation ? (
                    <div
                      ref={wrapperRef}
                      className={` absolute right-48 top-14 w-96 h-auto rounded-lg shadow-lg ${
                        Theme
                          ? "shadow-gray-800 bg-slate-800"
                          : "shadow-gray-200 bg-white "
                      }`}
                    >
                      <div className="flex w-full flex-col  pt-2 justify-center border-b-2">
                        <p className="px-5 font-medium text-lg">
                          Notificaciones
                        </p>

                        {invitations &&  isLoadingInvitations && isSuccessInvitations && invitations.invitations && invitations.invitations.length > 0
                          ? invitations.invitations
                              .slice(0, 5)
                              .map((invitation) => (
                                <>
                                  <div
                                    className={`w-full  flex my-1 justify-center items-center ${
                                      Theme ? "text-white hover:bg-slate-700 " : "text-black hover:bg-[#f5f5f5]"
                                    }`}
                                  >
                                    <p>
                                      <button
                                        className="p-1  font-medium text-sm"
                                        onClick={() =>
                                          ViewNotifications(invitation, "Notificaciones")
                                        }
                                      >{`${invitation.idPropietary.name} te ha invitado para unirse a su Workspace`}</button>
                                    </p>
                                  </div>
                                </>
                              ))
                          : <div
                          className={`w-full hover:bg-[#f5f5f5] flex my-1 justify-center items-center ${
                            Theme ? "text-white" : "text-black"
                          }`}
                        >
                          <p>
                            No tienes notificaciones
                          </p>
                        </div>}
                      </div>
                      <div className="w-full flex justify-center items-center">
                        <p>
                          <button
                            className="p-1 hover:text-blue-700 text-blue-600 font-medium text-lg"
                            onClick={() => redirectPage("/Notifications")}
                          >
                            Ver todas
                          </button>
                        </p>
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className=" mr-5">
                  <p className="max-sm:hidden p-2 font-medium text-lg">
                    Tema {Theme ? "oscuro" : "claro"}
                  </p>
                </div>
                <div
                  className="flex items-center justify-center mr-10 w-12 cursor-pointer rounded-full "
                  onClick={handleChangeTheme}
                >
                  {!Theme ? (
                    <MdOutlineLightMode className=" max-sm:w-4 max-sm:h-4 w-8 h-8 text-black" />
                  ) : (
                    <MdOutlineDarkMode className=" max-sm:h-4 max-sm:w-4 w-8 h-8 text-white" />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col h-5/6">
            <Outlet />
          </div>
        </div>
      </div>
    )
  ) : (
    <Outlet />
  );
}

export default LayoutPrivate;

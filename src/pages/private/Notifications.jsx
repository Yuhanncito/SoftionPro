import { SubTitle } from "../../atoms/TextsGlobal"
import { useUserContext } from "../../context/UserContext"
import { IoIosNotificationsOutline } from "react-icons/io"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { acceptInvitation } from "../../api"
import Cookies from "universal-cookie"

import Swal from "sweetalert2"
function Notifications() {
    const queryClient = useQueryClient()
    const cookie = new Cookies()
    const token = cookie.get("x-access-user")
    const { Theme } = useUserContext()
    const navigate = useNavigate()
    const [notifications, setNotifications] = useState(queryClient.getQueryData(["invitations"]))
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
        }
    })

    const handleAceptInvitation = async (notification) => {
        await acceptMutation.mutateAsync(notification)  
    }

  return (
    <div className="w-full h-full flex items-center justify-center " >
      <div className={`w-7/12 px-10 py-5 border-2 ${Theme ? "border-gray-800 bg-slate-900 " : "border-gray-200"}`}>
        <div className="w-full flex items-center">
            <IoIosNotificationsOutline className="w-8 h-8 mx-2 " />
            <SubTitle text={"Notificaciones " + notifications.invitations.length} />
        </div>
        <div className="w-full  p-2 mt-5 border-t-2 overflow-auto max-h-80">
            { notifications && notifications.invitations.map((notification) => (
                <div key={notification} className={`w-full hover:bg-[#f5f5f5] flex my-1  items-center ${Theme ? "text-white" : "text-black"}`}  onClick={() => ViewNotifications(notification, "Invitacion a workspace")} >
                    <p>
                        <button
                            className="p-1 hover:text-blue-700 text-blue-600 font-medium text-lg"
                           
                        >
                            {notification.idPropietary.name + " te ha invitado para unirse a su Workspace"}
                        </button>
                    </p>
                </div>
            ))} 
            
            
            
        </div>
      </div>
    </div>
  )
}

export default Notifications
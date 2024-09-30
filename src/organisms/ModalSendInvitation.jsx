import {useState} from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { GlobalText, SubTitle } from '../atoms/TextsGlobal'
import { FormsImputs } from '../molecules/FormsImputs'
import { useLoaderData } from 'react-router-dom'
import { sendInvitation } from '../api'
import Swal from 'sweetalert2'


function ModalSendInvitation({ openModalSendInvitation, setOpenModalSendInvitation, name, user }) {

    const useQuery = useQueryClient()
    const id = useLoaderData();
    const { register, handleSubmit: handleValidateSubmit, formState: { errors } } = useForm();
    const [invitation, setInvitation] = useState({
      email:'',
      workSpace: id
    })

    const handleChange = (e) => {
        setInvitation({
          ...invitation,
          [e.target.name]: e.target.value
        })
    }


    // const sendInvitationMutation = useMutation({
    //     mutationFn: async ({token, email}) => await sendInvitation(token, email),
    //     onSuccess: async () => {
    //         await useQuery.invalidateQueries(["users"])
    //         setOpenModalSendInvitation(false)
    //         Swal.fire({
    //             icon: "success",
    //             title: "Invitacion enviada",
    //         })
    //     },
    //     onError: async () => {
    //         Swal.fire({
    //             icon: "error",
    //             title: "Invitacion no enviada",
    //         })
    //     },
    // })

    const handleSubmit = async (e) => {
      try {
        const req = await sendInvitation(user,invitation);
        const message = req.message

        if (message === "Invitación enviada correctamente") {
          setOpenModalSendInvitation(false)
          Swal.fire({
            icon: "success",
            title: "Invitacion enviada",
          })
          return
        }
          Swal.fire({
            icon: "error",
            title: message,
          })
        
      } catch (error) {
        
      }
    }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <div className="bg-white py-10 px-8 w-1/3 m-4 rounded-lg">
        <SubTitle text={`Enviar invitación para ${name}`}/>
        <form onSubmit={handleValidateSubmit(handleSubmit)} className='flex flex-col px-10 py-3'>
          <FormsImputs onChange={handleChange} label={"Correo electronico"} type="email" text="elemplo@ejemplo.com" id="email" validate={register} />
          {
            errors.email && <GlobalText color={'red-500'} text={errors.email.message} />
          }
          <div className="flex justify-end pt-12">
            <button type="button" onClick={() => setOpenModalSendInvitation(false)} className="bg-red-500 text-white p-2 mr-2">Cancelar</button>
            <button type="submit" className="bg-blue-500 text-white p-2">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ModalSendInvitation
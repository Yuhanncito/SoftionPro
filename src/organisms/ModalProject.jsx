import React, { useState } from 'react'

function ModalProject({ open, setOpen }) {
  const [project, setProject] = useState({
    nameProject: '',
    workspaceid: ''
  })

  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Lógica de envío al servidor
    setOpen(false)
  }

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${open ? 'block' : 'hidden'}`}>
      <form className="bg-white p-8 rounded shadow-lg" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center">Crear proyecto</h2>
        <div className="mb-4">
          <label htmlFor="nameProject" className="block text-gray-700 text-sm font-bold mb-2">Nombre del proyecto</label>
          <input type="text" id="nameProject" name="nameProject" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleChange} value={project.nameProject} />
        </div>
        <div className="mb-6">
          <label htmlFor="workspaceid" className="block text-gray-700 text-sm font-bold mb-2">ID Espacio de trabajo</label>
          <input type="text" id="workspaceid" name="workspaceid" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleChange} value={project.workspaceid} />
        </div>
        <div className="flex items-center justify-between">
          <button type="button" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => setOpen(false)}>
            Cancelar
          </button>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Crear
          </button>
        </div>
      </form>
    </div>
  )
}

export default ModalProject

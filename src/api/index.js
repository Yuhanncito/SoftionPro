const BASEURL0 = 'https://proto-api2-0.vercel.app/api'
const BASEURL2 = 'https://softion-api-v3.vercel.app/api'
const BASEURL1 = 'http://srv554337.hstgr.cloud:4000/api'
const BASEURL = 'http://localhost:4000/api'


export const RegisterFunction = async (data) => {
    try {
        const response = await fetch(`${BASEURL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const result = await response.json()
        return result
    } catch (error) {
        console.log(error)
    }
}
export const LoginFunction = async (data) => {
    try {
        const response = await fetch(`${BASEURL}/auth/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const result = await response.json()
        return result
    } catch (error) {
        console.log(error)
    }
}
export const VerifyEmail = async (data) => {
    try {
        const action = (data.option === "register")?'signup':(data.option==="Login")?'signin':'forgotPassword'
        const response = await fetch(`${BASEURL}/auth/${action}/confirm`, {
            method: 'POST',
            headers: {  
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const result = await response.json()
        return result
    } catch (error) {
        console.log(error)
    }
}

export const getUser = async (data) => {
    try{
        const response = await fetch(`${BASEURL}/auth/${data}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const result = await response.json()
        return result
    }catch(error){
        console.log(error)
    }
}

export const getQuestion = async (data) => {
    try{
        const response = await fetch(`${BASEURL}/auth/question/${data}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const result = await response.json()
        return result
    }catch(error){
        console.log(error)
    }
}

export const VerifyQuestion = async (data) => {
    try{
        const response = await fetch(`${BASEURL}/auth/secret`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: data.email,
                secret: data.question,
                respuestaSecreta: data.answer
            })
        })
        const result = await response.json()

        return result
    }catch(error){
        console.log(error)
    }
}

export const SendEmail = async (data) => {
    try{
        const response = await fetch(`${BASEURL}/auth/forgotPassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const result = await response.json()
        return result
    }catch(error){
        console.log(error)
    }
}

export const getTasksbyWorkspace = async (data, id) => {
    try{
        const response = await fetch(`${BASEURL}/task/byWorkspace/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': data
            }
        })
        const result = await response.json()
        return result
    }catch(error){
        console.log(error)
    }
}

export const getUserData = async (data) => {
    try{
        const response = await fetch(`${BASEURL}/auth/`, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': data
            }
        })
        const result = await response.json()
        return result
    }catch(error){
        console.log(error)
    }
}

export const getWorkSpaces = async (data) => {
    try{
        const response = await fetch(`${BASEURL}/workspace`, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': data
            }
        })
        const result = await response.json()
        return result
    }catch(error){
        console.log(error)
        return {}
    }
}

export const getWorkSpacesById = async (data, id) => {
    try{
        const response = await fetch(`${BASEURL}/workspace/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': data
            }
        })
        const result = await response.json()
        return result
    }catch(error){
        console.log(error)
        return {}
    }
}

export const createNewProject = async (user, data) => {
    try{
        const response = await fetch(`${BASEURL}/projects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': user
            },
            body: JSON.stringify(data)
        })
        const result = await response.json()
        return result
    }catch(error){
        console.log(error)
        return {}
    }
}

export const updateProject = async (user, id, data) => {
    try{
        const response = await fetch(`${BASEURL}/projects/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': user
            },
            body: JSON.stringify(data)
        })
        const result = await response.json()
        return result
    }catch(error){
        console.log(error)
        return {}
    }
}

export const deleteProject = async (user, id, idWorkspace) => {
    try{
        const response = await fetch(`${BASEURL}/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': user
            },
            body: JSON.stringify({
                workspaceid : idWorkspace
            })
        })
        const result = await response.json()
        return result
    }catch(error){
        console.log(error)
        return {}
    }
}

export const getProjects = async (user, id) => {
    try{
        const response = await fetch(`${BASEURL}/projects/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': user
            }
        })
        const result = await response.json()
        return result
    }catch(error){
        console.log(error)
        return {}
    }
}

export const getTasks = async (user, id) => {
    try{
        const response = await fetch(`${BASEURL}/task/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': user
            }
        })
        const result = await response.json()
        return result
    }catch(error){
        console.log(error)
        return {}
    }
}

export const getTaskById = async (user, id) => {
    try{
        const response = await fetch(`${BASEURL}/task/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': user
            }
        })
        const result = await response.json()
        return result
    }catch(error){
        console.log(error)
        return {}
    }
}

export const deleteTask = async (token, id, workspaceid) => {
    
    const body = {
        workspaceid:workspaceid
    }

    try{
        const response = await fetch(`${BASEURL}/task/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify(body)
        })
        const result = await response.json()
        console.log(result)
        return result
    }catch(error){
        console.log(error)
        return {}
    }
}

export const insertNewTask = async (user, data) => {
    try{
        const response = await fetch(`${BASEURL}/task/newTask`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': user
            },
            body: JSON.stringify(data)
        })
        
        const result = await response.json()
        return result
    }catch(error){
        console.log(error)
        return {}
    }
}

export const updateTask = async (user, data) => {
    try{
        const response = await fetch(`${BASEURL}/task/${data._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': user
            },
            body: JSON.stringify(data)
        })
        const result = await response.json()
        console.log(result)
        return result
    }catch(error){
        console.log(error)
        return {}
    }
}

export const sendInvitation = async (user, data) => {
    try{
        const response = await fetch(`${BASEURL}/invitation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': user
            },
            body: JSON.stringify(data)
        })
        const result = await response.json()
        console.log(result)
        return result
    }catch(error){
        console.log(error)
        return {}
    }
}

export const acceptInvitation = async (user, token) => {
    try{
        const response = await fetch(`${BASEURL}/invitation/${user}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        })
        const result = await response.json()
        console.log(result)
        return result
    }catch(error){
        console.log(error)
        return {}
    }
}

export const getInvitations = async (user, token) => {
    try{
        const response = await fetch(`${BASEURL}/invitation/${user}`, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        })
        const result = await response.json()
        return result
    }catch(error){
        console.log(error)
        return {}
    }
}

export const updatePassword = async (user, data) => {
    try{
        const response = await fetch(`${BASEURL}/auth/forgotPassword/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': user
            },
            body: JSON.stringify(data)
        })
        const result = await response.json()
        console.log(result)
        return result
    }catch(error){
        console.log(error)
        return {}
    }
}  
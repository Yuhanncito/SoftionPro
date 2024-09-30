import { createContext , useState , useContext } from 'react'

export const UserContext = createContext(false);

const UserProvider = ({children}) => {
    const [userDataContext, setUserContext] = useState('Hola');
    const [isMessage, setIsMessage] = useState(false);
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [question, setQuestion] = useState({});
    const [workspace, setWorkspace] = useState({});
    const [project, setProject] = useState({});
    const [Theme, setTheme] = useState(false)
    const [Action, setAction] = useState('')
    const [token,setToken] = useState(null)
    const [privilege,setPrivilege] = useState('')
    const [admin,setAdmin] = useState(false)

    return(
        <UserContext.Provider value={{privilege,setPrivilege,admin,setAdmin,token,setToken,userDataContext, setUserContext, isMessage, setIsMessage, message, setMessage, email, setEmail, question, setQuestion , workspace, setWorkspace, project, setProject, Theme, setTheme, Action, setAction}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;

export const useUserContext = () => useContext(UserContext);
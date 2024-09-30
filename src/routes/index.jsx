import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/public/LoginPage";
import RegisterPages from "../pages/public/RegisterPages";
import LayoutPublic from "../layouts/LayoutPublic";
import NotFound from "../pages/404NotFound";
import ForgotPassword from "../pages/public/ForgotPasswordPage";
import VerifyEmail from "../pages/private/VerifyEmailPage";
import RestorePassword from "../pages/private/RestorePasswordPage";
import VerifyQuestion from "../pages/private/VerifyQuestionPage";
import LayoutPrivate from "../layouts/LayoutPrivate";
import AppPage, { Loader } from "../pages/private/AppPage";
import TaskView from "../pages/private/TaskView";
import HomeAppTemplate from "../templates/HomeAppTemplate";
import { getProjects, getWorkSpaces, getWorkSpacesById } from "../api";
import Cookies from "universal-cookie";
import WorkSpaces from "../pages/private/WorkSpaces";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import ListTask from "../pages/private/TasksViews/ListTask";
import BoardTask from "../pages/private/TasksViews/BoardTask";
import PrincipalView from "../pages/private/TasksViews/PrincipalView";
import { useUserContext } from "../context/UserContext";
import GanttTask from "../pages/private/TasksViews/GanttTask";
import Profile from "../pages/private/Profile";
import LayoutAuth from "../layouts/LayoutAuth";
import EditProject from "../pages/private/EditProject";
import Notifications from "../pages/private/Notifications";
import DatosPersonales from "../templates/App";
import WorkspaceEdit from "../pages/private/WorkspaceEdit";
import PrivacyPolicies from "../pages/public/PrivacyPolicies";
import EditTask from "../pages/private/TasksViews/EditTask";
import TasksInfo from "../pages/private/TasksViews/TasksInfo";


const cookie = new Cookies();

export const route = createBrowserRouter([
    {
        path:'/',
        element:<LayoutPublic />,
        errorElement:<NotFound />,
        children:[
            {
                path:'/',
                element:<LoginPage />
            },
            {
                path:'/register',
                element:<RegisterPages />
            },
            {
                path:'reset-password',
                element:<ForgotPassword />

            },
            {
                path:'/',
                element:<LayoutPrivate />,
                children:[
                    {
                        path:'/Profile',
                        element:<Profile />,
                        loader: () => { return 0 }
                    },
                    {
                        path:'/App',
                        element:<AppPage />,
                        loader: () => { return getWorkSpaces( cookie.get('x-access-user') )}
                    },
                    {
                        path:'/App/:id',
                        element: <WorkSpaces />,
                        loader: async ({params}) => { 
                            return params.id
                         }  
                    },
                    {
                        path:'/App/:id/Edit',
                        element: <WorkspaceEdit />,
                        loader: async ({params}) => { 
                            return params.id
                         }  
                    },{
                        path:'/Notifications',
                        element: <Notifications />,
                    },{
                        path:'/Notifications/:id',
                        element: <Notifications />,
                    },{
                        path:'/App/:workspaceId/:projectId',
                        element:<TaskView />,
                        children:[
                            {
                                index:true,
                                element:<PrincipalView />,  
                                loader:() => { return 0},
                                
                            },
                            {
                                path:'/App/:workspaceId/:projectId/Gantt',
                                element:<GanttTask />
                            },
                            {
                                path:'/App/:workspaceId/:projectId/Board',
                                element:<BoardTask />
                            },
                            {
                                index:true,
                                path:'/App/:workspaceId/:projectId/List',
                                element:<ListTask />
                            }
                        ],
                    },
                    {
                        path:'/App/:workspaceId/:projectId/Edit',
                        element:<EditProject />
                    },{
                        path:'/App/:workspaceId/:projectId/:idTask',
                        element:<TasksInfo />,
                    },
                    {
                        path:'/App/:workspaceId/:projectId/:idTask/Edit',
                        element:<EditTask />
                    }
                ]
            },
            {
                path:'/',
                element: <LayoutAuth />,
                children:[
                    {
                        path:'/verify-email',
                        element:<VerifyEmail />
        
                    },
                    {
                        path:'/restore-password',
                        element:<RestorePassword />
                    },
                    {
                        path:'/verify-question',
                        element:<VerifyQuestion />
                    }
                ]
            }
        ]
    },
    {
        path:'/privacy-policies',
        element:<PrivacyPolicies />
    }
])

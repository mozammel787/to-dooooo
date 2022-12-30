import AddTask from "../Components/AddTask";
import CompleteTask from "../Components/CompleteTask";
import MyTask from "../Components/MyTask";
import Main from "../Layout/Main";
import Tab from "../Layout/Tab";
import Error from "../Page/Error";
import Home from "../Page/Home";
import LogIn from "../Page/LogIn";
import SignUp from "../Page/SignUp";
import PrivetRouter from "./PrivetRouter";

const { createBrowserRouter } = require("react-router-dom");

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            
            {
                path: '/to-dooooo',
                element: <PrivetRouter><Tab></Tab></PrivetRouter>,
                children:[
                    {
                        path:"/to-dooooo/add-task",
                        element:<AddTask></AddTask>
                    },
                    {
                        path:"/to-dooooo/my-task",
                        element:<MyTask></MyTask>
                    },
                    {
                        path:"/to-dooooo/complete-task",
                        element:<CompleteTask></CompleteTask>
                    }
                ]
            },
            
            {
                path: '/login',
                element: <LogIn></LogIn>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            }
        ]
    },
    {
        path: '/*',
        element: <Error></Error>
    }
])


export default router;
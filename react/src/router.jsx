import { Navigate, createBrowserRouter } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Survay from "./views/Survays";
import GuestLayout from "./components/GuestLayout";
import DefaultLayout from "./components/DefaultLayouts";
import SurveyView from "./views/SurveyView";


const router = createBrowserRouter([
{
    path:"/",
    element:<DefaultLayout/>,
    children:[
     {
        path: "/",
        element:<Navigate to="/dashboard"/>
     },
     {
        path: "/dashboard",
        element:<Dashboard/>
     },
     {
        path: "/survays",
        element:<Survay/>
     },
     {
        path: "/survays/create",
        element:<SurveyView/>
     },
    ]
},
{
    path:"/",
    element:<GuestLayout/>,
    children: [{
        path: "/login",
        element:<Login/>
     },
     {
        path: "/signup",
        element:<Signup/>
     },]
}
]);


export default router;

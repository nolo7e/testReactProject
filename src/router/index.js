import About from "../pages/About";
import Login from "../pages/Login";
import PostIdPage from "../pages/PostIdPage";
import Posts from "../pages/Posts";
import { BrowserRouter, Link, Navigate, Route, Router, Routes } from "react-router-dom";
import Error from "../pages/Error";


export const privateRoutes = [
    {path:'/about', element:<About/>, exact: true},
    {path:'/posts', element:<Posts/>, exact: true},
    {path:'/posts/:id', element:<PostIdPage/>, exact: true},
    {path:"*" ,element:<Navigate to="/posts"/>, exact:true},
    //{path:"/error" ,element:<Error/>, exact:true},
]

export const publicRoutes = [
    {path:'/login', element:<Login/>, exact: true},
    {path:"*", element:<Navigate to="/login"/>, exact: true}
]
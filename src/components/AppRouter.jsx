import React from "react";
import { BrowserRouter, Link, Navigate, Route, Router, Routes } from "react-router-dom";
import About from "../pages/About";
import Posts from "../pages/Posts";
import Error from "../pages/Error";
import PostIdPage from "../pages/PostIdPage";
import { publicRoutes, privateRoutes } from "../router";
import { useContext } from "react";
import { AuthContext } from "../context";
import Loader from "./UI/Loader/Loader";

const AppRouter = () => {
  const {isAuth, isLoading} = useContext(AuthContext);
  console.log(isAuth);

  if(isLoading){
    return <Loader/>
  }

    return(
      isAuth 
      ?
      <Routes>
          {privateRoutes.map(route =>
            <Route 
              path={route.path} 
              element={route.element} 
              exact={route.exact}
              key={route.path}
            />
          )}
        </Routes>
      : 
      <Routes>
        {publicRoutes.map(route =>
            <Route 
              path={route.path} 
              element={route.element} 
              exact={route.exact}
              key={route.path}
            />
          )}
      </Routes>
        
    );
};

export default AppRouter;

import { useContext, useCallback, useState } from "react";
import { NavLink, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import AuthContext from "../Store/Context";
import Input from "./Input";
import Movie from "./Movie";
import "./style.css";

const MainContent = () => {
  const authCtx = useContext(AuthContext);
  let navigate = useNavigate();
  const logout = () => {
    authCtx.auth.signOut();
    // authCtx.logginout();
    localStorage.removeItem("accessToken");
    navigate("/Login");
  };

  return (
    <div
      className='container'
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.5) 100%),url(${authCtx.backdrop})`,
        backgroundSize: "cover",
      }}
    >
      <div className='nav'>
        <NavLink to='/Home/Mylist' className='mylist'>
          My List
        </NavLink>
        <h4 className='logout' onClick={logout}>
          Logout
        </h4>
      </div>
      {authCtx.user && (
        <h1 className='username'>
          Welcome back ,{authCtx.user._delegate.displayName}.
        </h1>
      )}
      <Input />
      <Outlet />
    </div>
  );
};

export default MainContent;

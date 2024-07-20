import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectAuth } from "../../BLL/slice/auth.slice";
import { Link } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
 
  const onClickLogout = () => {
    if(window.confirm("Are you sure  you want to log")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    };
  
  }
  
  return (
    <div className="flex justify-between items-center p-6">
      <h1 className="font-bold text-3xl flex items-center">
        Phone Store
        <div className="ml-2">
          <div className="bg-red-500 h-3 w-6 rounded-full inline-block"></div> 
        </div>
        <div className="ml-2">
          <div className="bg-blue-500 h-3 w-6 rounded-full inline-block"></div> 
        </div>
        <div className="ml-2">
          <div className="bg-green-500 h-3 w-6 rounded-full inline-block"></div> 
        </div>
      </h1>
      <div>
        {auth ? (
          <div>
              <span className="pr-2">{auth.fullName}</span>
             <button className="bg-blue-500 text-white p-2 rounded" onClick={onClickLogout} color="error">Logout</button>
             </div>
        ) : (
          <>
            <Link to="/register" className="rounded pr-2">
              <button className="bg-blue-500 text-white p-2 rounded">Sign up</button>
            </Link>
            <Link to="/login">
              <button className="bg-blue-500 text-white p-2 rounded">Login</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
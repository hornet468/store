import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <nav className="flex items-center justify-center font-bold space-x-16 bg-black text-white">
           <div className="pr-11">
              <NavLink to={"/"}>Home</NavLink>
           </div>
           <div className="pr-11">
               <NavLink to={"/basket"}>Basket</NavLink>
           </div>
           <div className="pr-11">
               <a>Settings</a>
           </div>
           <div className="pr-11">
               <a>More info</a>
           </div>
           </nav>
    )
}

export default Sidebar;
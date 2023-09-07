import React, { useState } from "react";
import {Link, NavLink} from "react-router-dom";
import Logo from "../asset/img/logo.png";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { btnClick, slideTop } from "../animation/index";
import { motion } from "framer-motion";
import { MdShoppingCart, MdLogout} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../asset/img/avatar.png";
import {getAuth} from 'firebase/auth'
import {app} from '../config/firebase.config.js'
import { setUserNull } from "../context/actions/userActions";

const Header = () => {
  const user = useSelector((state) => state.user);
  const [isMenu, setIsMenu] = useState(false)
  const firebaseAuth = getAuth(app)
  const dispacth = useDispatch()

  const signOut = () => {
    firebaseAuth.signOut().then(() => {
      dispacth(setUserNull())
      // navigate('/login', {replace: true})
    }).catch((err) => console.log(err))
  }

  return (
    <header
      className="fixed backdrop-blur-md z-50 inset-x-0 top-0 
    flex items-center justify-between p-3 px-4 md:p-2 md:px-16">
      <NavLink to={"/"} className="flex items-center justify-center gap-4">
        <img src={Logo} className="w-24 object-cover" alt="" />
      </NavLink>
      <nav className="flex items-center justify-center gap-8">
        <ul className="hidden md:flex items-center, justify-center gap-11">
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/"}>
            Trang chủ
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/menu"}>
            Menu
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/aboutus"}>
            Về chúng tôi
          </NavLink>
        </ul>
        <motion.div {...btnClick} className="relative cursor-point">
          <MdShoppingCart className="text-textColor text-2xl cursor-pointer w-7 h-7" />
          <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center absolute -top-2 -right-1">
            <p className="text-primary text-sm font-semibold">2</p>
          </div>
        </motion.div>

        {user ? (
          <>
            <div className="relative cursor-pointer"
            onMouseEnter={() => setIsMenu(true)}>
              <div className="w-10 h-10 rounded-full shadow-md overflow-hidden bg-green-300 flex items-center justify-center">
                <motion.img
                  className="w-full h-full object-cover"
                  src={user?.picture ? user.picture : Avatar}
                  whileHover={{ scale: 1.15 }}
                  referrerPolicy="no-referrer"/>
              </div>
              {isMenu && (
                <motion.div {...slideTop}
                onMouseLeave={()=> setIsMenu(false)}
                className="p-3 w-40 bg-lightOverlay backdrop-blur-md rounded-md shadow-md absolute top-12 right-0 flex items-center justify-center  flex-col gap-4">
                <Link to={"/dashboard"} className="text-base hover:text-violet-400 text-textColor">
                  Dashboard
                </Link>
                <Link to={"/profile"} className="text-base hover:text-violet-400 text-textColor">
                  Profile
                </Link>
                <Link to={"/orders"} className="text-base hover:text-violet-400 text-textColor">
                  Orders
                </Link>
                <motion.div {...btnClick} 
                  onClick={signOut}
                  className="group flex items-center justify-center p-3 rounded-md shadow-md bg-gray-100 hover:bg-gray-200 gap-3">
                  <MdLogout className="text-xl text-textColor group-hover::text-headingColor"/>
                  <p className="text-sm text-textColor group-hover::text-headingColor">Đăng xuất</p>
                </motion.div>
              </motion.div>  
              )}
            </div>
          </>
        ) : (
          <>
            <NavLink to={"/login"}>
              <motion.button
                {...btnClick}
                className="px-4 py-2 rounded-md shadow-md bg-lightOverlay border border-violet-300 cursor-pointer">
                Login
              </motion.button>
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;

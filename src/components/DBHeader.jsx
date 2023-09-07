import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdSearch, BsToggles2, BsFillBellFill, MdLogout } from "../asset/icons/index";
import { btnClick } from "../animation/index";
import { motion } from "framer-motion";
import Avatar from "../asset/img/avatar.png";
import {getAuth} from 'firebase/auth'
import {app} from '../config/firebase.config.js'
import { setUserNull } from "../context/actions/userActions";
import {useNavigate } from "react-router-dom";

const DBHeader = () => {
  const user = useSelector((state) => state.user);
  const firebaseAuth = getAuth(app)
  const navigate = useNavigate()
  const dispacth = useDispatch()

  const signOut = () => {
    firebaseAuth.signOut().then(() => {
      dispacth(setUserNull())
      navigate('/', {replace: true})
    }).catch((err) => console.log(err))
  }

  return (
    <div className="w-full flex items-center justify-between gap-3">
      <p className="text-xl text-headingColor">
        {user?.name && <span>{`Hello ${user?.name}`}</span>}
      </p>
      <div className="flex items-center justify-center gap-4 cursor-pointer">
        <div className="flex items-center justify-center gap-3 px-4 py-2 bg-lightOverlay backdrop-blur-md rounded-md shadow-md">
          <MdSearch className="text-gray-400 text-2xl" />
          <input
            className="border-none outline-none bg-transparent w-32 text-base font-semibold text-textColor"
            type="text"
            placeholder="Tìm kiếm..."
          />
          <BsToggles2 className="text-gray-400 text-2xl" />
        </div>
        <motion.div
          {...btnClick}
          className="w-10 h-10 rounded-md cursor-pointer bg-lightOverlay backdrop-blur-md shadow-md flex items-center justify-center">
          <BsFillBellFill className="text-gray-400 text-2xl" />
        </motion.div>

        <div className="flex items-center justify-center gap-2">
          <div className="w-10 h-10 rounded-full shadow-md overflow-hidden cursor-point">
            <motion.img
              className="w-full h-full object-cover"
              src={user?.picture ? user.picture : Avatar}
              whileHover={{ scale: 1.15 }}
              referrerPolicy="no-referrer"
            />
          </div>
          <motion.div
            {...btnClick}
            onClick={signOut}
            className="group flex items-center justify-center p-3 rounded-md shadow-md bg-gray-100 hover:bg-gray-200 gap-3">
            <MdLogout className="text-xl text-textColor group-hover::text-headingColor" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DBHeader;

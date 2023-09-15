import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../asset/img/logo.png";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";

const DBLeftSection = () => {
  return (
    <div className="h-full py-2 flex flex-col bg-lightOverlay backdrop-blur-md shadow-md min-w-210 w-300 gap-3">
      <NavLink to={"/"} className="flex items-center justify-start px-5 gap-4">
        <img src={Logo} className="w-24 object-cover" alt="Logo" />
      </NavLink>
      <hr />
      <ul className="flex flex-col gap-4">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-violet-500`
              : isNotActiveStyles
          }
          to={"/dashboard/home"}>
          Thống kê
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-violet-500`
              : isNotActiveStyles
          }
          to={"/dashboard/orders"}>
          Đơn hàng
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-violet-500`
              : isNotActiveStyles
          }
          to={"/dashboard/products"}>
          Sản phẩm
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-violet-500`
              : isNotActiveStyles
          }
          to={"/dashboard/category"}>
          Danh mục
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-violet-500`
              : isNotActiveStyles
          }
          to={"/dashboard/users"}>
          Khách hàng
        </NavLink>
      </ul>

      <div></div>
    </div>
  );
};

export default DBLeftSection;

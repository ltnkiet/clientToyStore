import React from 'react'
import DataTable from './DataTable'
import { NavLink } from "react-router-dom";


const DBProducts = () => {
  return (
    <div className='flex flex-col items-center justify-self-center gap-4 pt-6 w-full relative'>
      <NavLink
        to={"/dashboard/newProduct"}
        className="absolute left-0 p-2 rounded-md bg-green-400 font-semibold text-primary hover:bg-green-600">
        Thêm sản phẩm mới
      </NavLink>
      <DataTable />
    </div>
  )
}

export default DBProducts
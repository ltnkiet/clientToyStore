import React from 'react'
import DBHeader from './DBHeader'
import { Route, Routes } from 'react-router-dom'
import {DBHome, DBOrders, DBProducts, DBNewProduct, DBUsers, DBCategory, DBNewCategory} from '../components'


const DBRightSection = () => {
  return (
    <div className='flex flex-col p-12 flex-1 h-full'>
      <DBHeader/>
      <div className='flex flex-col flex-1 overflow-y-scroll scrollbar-none'>
        <Routes>
          <Route path={'/home'} element={<DBHome/>}/>
          <Route path={'/orders'} element={<DBOrders/>}/>
          <Route path={'/products'} element={<DBProducts/>}/>
          <Route path={'/newProduct'} element={<DBNewProduct/>}/>
          <Route path={'/category'} element={<DBCategory/>}/>
          <Route path={'/newCategory'} element={<DBNewCategory/>}/>
          <Route path={'/users'} element={<DBUsers/>}/>
        </Routes>  
      </div> 
    </div>
  )
}

export default DBRightSection
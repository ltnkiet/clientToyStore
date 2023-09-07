import { motion } from 'framer-motion'
import React from 'react'
import { fadeInOut } from '../animation'
import {FaCheck, BsExclamationTriangleFill} from '../asset/icons'

const Alert = ({type, message}) => {

  if(type === 'success'){
    return (
      <motion.div {...fadeInOut}
        className='fixed z-50 top-20 right-20 px-4 py-2 rounded-md backdrop-blur-sm bg-emerald-300 shadow-md flex items-center gap-4'>
          <FaCheck className='text-xl text-emerald-700'/>
          <p className='text-xl text-emerald-700'>{message}</p>
      </motion.div>
    )
  }

  if(type === 'warning'){
    return (
      <motion.div {...fadeInOut}
        className='fixed z-50 top-20 right-20 px-4 py-2 rounded-md backdrop-blur-sm bg-orange-300 shadow-md flex items-center gap-4'>
          <BsExclamationTriangleFill className='text-xl text-orange-700'/>
          <p className='text-xl text-orange-700'>{message}</p>
      </motion.div>
    )
  }

  if(type === 'danger'){
    return (
      <motion.div {...fadeInOut}
        className='fixed z-50 top-20 right-20 px-4 py-2 rounded-md backdrop-blur-sm bg-red-300 shadow-md flex items-center gap-4'>
          <FaCheck className='text-xl text-red-700'/>
          <p className='text-xl text-red-700'>{message}</p>
      </motion.div>
    )
  }

  if(type === 'infor'){
    return (
      <motion.div {...fadeInOut}
        className='fixed z-50 top-60 right-20 px-4 py-2 rounded-md backdrop-blur-sm bg-blue-300 shadow-md flex items-center gap-4'>
          <FaCheck className='text-xl text-blue-700'/>
          <p className='text-xl text-blue-700'>{message}</p>
      </motion.div>
    )
  }
}

export default Alert
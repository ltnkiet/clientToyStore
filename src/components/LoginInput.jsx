import React, {useState} from 'react'
import {motion } from 'framer-motion'
import { fadeInOut } from '../animation'

const LoginInput = ({placeHolder, icon, inputState, inputStateFunc, type}) => {

  const [isFocus, setIsFocus] = useState(false)

  return (
    <motion.div {...fadeInOut}
      className={`flex items-center justify-center gap-4 bg-gray-200 
    w-full px-4 rounded-md py-2
    ${isFocus ? "border-2 border-green-500" : "border-none"}`}>
      {icon}
      <input 
        type={type}
        placeholder={placeHolder}
        className="w-full h-full bg-transparent text-headingColor text-lg 
        font-semibold border-none outline-none" 
        value={inputState}
        onChange={(e) => inputStateFunc(e.target.value)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}/>
    </motion.div>
  )
}

export default LoginInput
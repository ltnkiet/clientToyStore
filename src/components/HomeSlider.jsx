import { motion } from "framer-motion";
import React from "react";
import Slider from "./Slider";

const HomeSlider = () => {
  return (
    <motion.div className="w-full flex items-start justify-start flex-col">
      <div className="w-full flex items-center justify-between">
        <p
          className="text-2xl font-semibold uppercase text-headingColor relative 
          before:absolute before:rounded-lg before:content before:w-32 before:h-1 
          before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-violet-400 to-violet-600 
          transition-all ease-in-out duration-100">
          Dành cho bạn
        </p>
      </div>
      <Slider/>
    </motion.div>
  );
};

export default HomeSlider;

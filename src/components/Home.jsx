import React from "react";
import { motion } from "framer-motion";
import HomeBg from "../asset/img/HomeBg.png";

const Home = () => {
  return (
    <motion.div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
      <div className="py-2 flex-1 flex flex-col items-center justify-center">
        <p className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor">
          Welcome to the
          <span className="text-violet-700 text-[3rem] lg:text-[5rem]">
            {" "}
            TOY STORE
          </span>
        </p>
      </div>
      <div className="py-2 flex-1 flex flex-col items-end">
        <img
          src={HomeBg}
          className="ml-50 w-[680px] h-[500px] rounded-3xl"
          alt=""
        />
      </div>
    </motion.div>
  );
};

export default Home;

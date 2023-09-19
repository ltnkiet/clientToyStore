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
        <p className="text-xl pr-1 leading-8">
          Chúng tôi tự hào giới thiệu đến bạn một thế giới đầy màu sắc và phấn
          khích, nơi mà niềm vui của trẻ thơ được thể hiện qua những món đồ chơi
          độc đáo và phong cách.
        </p>
        <p className="pr-1 text-xl leading-8">
          Không chỉ dành riêng cho trẻ em, cửa hàng đồ chơi của chúng tôi còn là
          điểm đến tuyệt vời cho cả gia đình. Chúng tôi tin rằng đồ chơi không
          chỉ là công cụ giúp trẻ phát triển tư duy và kỹ năng, mà còn là cầu
          nối giữa các thế hệ trong gia đình.
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

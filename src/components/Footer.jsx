import React from "react";
import Logo from "../asset/img/logo.png";
import { BiSolidMap, BsFillTelephoneFill, MdEmail } from "../asset/icons/index";

const Footer = () => {
  return (
    <div className="w-full bg-violet-400 h-[20%] grid grid-cols-3 p-10 gap-5">
      <div className="flex items-center justify-center w-40 h-40 ml-28">
        <img src={Logo} className="w-full h-full object-contain" alt="" />
      </div>
      <div className="grid gap-3">
        <h1 className="text-2xl font-semibold text-white">Về chúng tôi</h1>
        <p className="text-base">
          Chào mừng quý khách đến với cửa hàng đồ chơi của chúng tôi! Chúng tôi
          tự hào giới thiệu đến bạn một không gian đầy màu sắc và sáng tạo, nơi
          mà niềm vui và sự phấn khích của trẻ thơ được thể hiện qua những món
          đồ chơi đa dạng và phong phú.
        </p>
      </div>
      <div className="grid gap-3">
        <h1 className="text-2xl font-semibold text-white">Liên hệ</h1>
        <p className="flex items-center flex-row gap-3">
          <span>
            <BiSolidMap/>
          </span>
          449/17, Trường Chinh, Tân Bình, TP Hồ Chí Minh
        </p>
        <p className="flex flex-row items-center gap-3">
          <span><BsFillTelephoneFill/></span>
          0384029072
          
        </p>
        <p className="flex flex-row items-center gap-3">
          <span><MdEmail/></span>
          ltnkietviii@mail.com
        </p>
      </div>
    </div>
  );
};

export default Footer;

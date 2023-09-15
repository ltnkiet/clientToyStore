import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../asset/css/swiperStyles.css";
import "swiper/css/bundle";
import { useSelector } from "react-redux";
import { SliderCard } from "../components";

const Slider = () => {
  
  const products = useSelector((state) => state.products);
  const [lego, setLego] = useState(null);

  useEffect(() => {
    setLego(products?.filter((data) => data.productCategory === "Lego"));
  }, [products]);

  return (
    <div className="w-full pt-6">
      <Swiper
        slidesPerView={4}
        centeredSlides={false}
        spaceBetween={30}
        grabCursor={true}>
        {lego &&
          lego.map((data, i) => (
            <SwiperSlide key={i}>
              <SliderCard key={i} data={data} index={i} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Slider;

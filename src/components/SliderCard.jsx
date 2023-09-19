import { motion } from "framer-motion";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart, getCartItems } from "../api";
import { alertNull, alertSuccess } from "../context/actions/alertActions";
import { setCartItems } from "../context/actions/cartActions";

const SliderCard = ({ data, index }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const addToCard = () => {
    dispatch(alertSuccess("Đã thêm vào giỏ hàng"));
    addItemToCart(user?.user_id, data).then((res) => {
      getCartItems(user?.user_id).then((items) => {
        dispatch(setCartItems(items));
      });
      setInterval(() => {
        dispatch(alertNull());
      }, 3000);
    });
  };

  return (
    <div
      className="w-[400px] h-[400px] min-w-[310px] md:w-[300px] md:min-w-[290px]
    rounded-lg py-2 flex flex-1 flex-col items-center justify-start relative">
      <div className=" flex flex-col justify-between">
        <div
          className="w-[277px] h-[260px] md:w-[260px] bg-violet-500 cursor-pointer 
              flex items-center justify-center">
          <motion.img
            whileHover={{ scale: 1.1 }}
            src={data.productImage}
            className="w-full h-full p-3 object-cover"
          />
        </div>
        <div className="md:w-[260px] max-w-[250px] flex flex-col my-0 py-[1px] gap-4 items-start">
          <p className="text-lg w-[250px] font-normal cursor-pointer whitespace-nowrap overflow-hidden overflow-ellipsis">
            {data.productName}
          </p>
          <p className="text-xl text-red-700 font-semibold">
            {Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(data.productPrice)}
          </p>
        </div>
        <button
          onClick={addToCard}
          className="md:w-[260px] w-[277px] bg-violet-500 border rounded p-2 font-medium 
              hover:bg-slate-100 border-violet-700">
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
};

export default SliderCard;

import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { slideIn } from "../animation";
import {
  RiRefreshFill,
  MdOutlineKeyboardBackspace,
  BiMinus,
  BiPlus,
} from "../asset/icons";
import { useDispatch, useSelector } from "react-redux";
import { setCartOff } from "../context/actions/displayCartActions";
import { setCartItems } from "../context/actions/cartActions";
import EmptyCart from "../asset/img/emptyCart.svg";
import { btnClick } from "../animation";
import { getCartItems, server, updateItemQty } from "../api";
import axios from "axios";

const Cart = () => {
  
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const dispacth = useDispatch();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let tot = 0;
    if (cart) {
      cart.map((data) => {
        tot = tot + parseFloat(data.productPrice) * data.quantity;
        setTotal(tot);
      });
    }
  }, [cart]);

  const checkOut = () => {
    
  }

  return (
    <motion.div
      {...slideIn}
      className="fixed backdrop-blur-md w-6/12 top-0 right-0  md:w-5/12 h-screen z-50
      flex flex-col bg-white">
      <div className="w-full flex items-center justify-between px-6 py-4 cursor-pointer">
        <motion.div {...btnClick} onClick={() => dispacth(setCartOff())}>
          <MdOutlineKeyboardBackspace
            className="text-textColor text-3xl"
            {...btnClick}
          />
        </motion.div>
        <p className="text-textColor text-lg font-bold">Giỏ hàng</p>
        <motion.p
          {...btnClick}
          className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md 
          cursor-pointer text-textColor text-base">
          Xóa
          <RiRefreshFill />
        </motion.p>
      </div>
      <div className="flex-1 flex rounded-t-3xl shadow-md flex-col w-full h-full pb-6 gap-3 relative items-start justify-start">
        {cart && cart?.length > 0 ? (
          <>
            <div className="flex flex-col w-full h-[75%] items-start justify-start gap-3 overflow-y-scroll scrollbar-none px-6">
              {cart &&
                cart?.length > 0 &&
                cart?.map((item, i) => (
                  <CartItemCard key={i} index={i} data={item} />
                ))}
            </div>
            <div className="w-full h-[24%] px-6">
              <div className="w-full border-b-[2px] border-gray-600"></div>
              <div className="w-full flex items-center justify-between my-6">
                <p className="text-xl font-semibold">Tổng tiền</p>
                <p className="text-xl font-semibold">{formatCurrency(total)}</p>
              </div>
              {user ? (
                <motion.button
                  onClick={checkOut()}
                  {...btnClick}
                  className="w-full p-2 px-20 rounded-full bg-gradient-to-tr from-violet-500
              to-violet-700 text-gray-50 text-lg my-2 hover:shadow-lg">
                  Tiến hành thanh toán
                </motion.button>
              ) : (
                <motion.button
                  {...btnClick}
                  onClick={checkOut()}
                  className="w-full p-2 rounded-full bg-gradient-to-tr from-violet-500 
              to-violet-700 text-gray-50 text-lg my-2 hover:shadow-lg">
                  Đăng nhập để thanh toán
                </motion.button>
              )}
            </div>
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-6">
            <img src={EmptyCart} className="w-300" alt="" />
            <p 
              className="text-xl text-textColor font-semibold">
              Chưa có sản phẩm nào trong giỏ hàng
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export const formatCurrency = (value) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

export default Cart;

export const CartItemCard = ({ index, data }) => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const dispacth = useDispatch();

  const [itemTotal, setItemTotal] = useState(0);

  const decrementQty = (productId) => {
    updateItemQty(user?.user_id, productId, "decrement").then((data) => {
      getCartItems(user?.user_id).then((items) => {
        dispacth(setCartItems(items));
      });
    });
  };
  const incrementQty = (productId) => {
    updateItemQty(user?.user_id, productId, "increment").then((data) => {
      getCartItems(user?.user_id).then((items) => {
        dispacth(setCartItems(items));
      });
    });
  };

  useEffect(() => {
    setItemTotal(parseFloat(data.productPrice) * data.quantity);
  }, [itemTotal, cart]);

  return (
    <motion.div
      key={index}
      className="w-full flex items-center justify-start gap-3">
      <div className="w-20 h-20 min-w-[80px] bg-violet-500">
        <img
          src={data?.productImage}
          alt=""
          className="w-full h-full object-cover p-1"
        />
      </div>
      <div className="flex flex-col items-start justify-center gap-4 w-full font-semibold ">
        <p className="text-lg w-[70%] whitespace-nowrap overflow-hidden overflow-ellipsis">
          {data?.productName}
        </p>
        <p className="text-sm">{formatCurrency(itemTotal)}</p>
      </div>
      <div className="group flex items-center gap-2 ml-auto cursor-pointer font-medium">
        <motion.div {...btnClick} onClick={() => decrementQty(data?.productId)}>
          <BiMinus className="w-6 h-6" />
        </motion.div>
        <p className="w-5 h-5 flex items-center justify-center">
          {data?.quantity}
        </p>
        <motion.div {...btnClick} onClick={() => incrementQty(data?.productId)}>
          <BiPlus className="w-6 h-6" />
        </motion.div>
      </div>
    </motion.div>
  );
};

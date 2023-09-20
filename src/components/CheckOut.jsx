import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems } from "../context/actions/cartActions";
import { getCartItems } from "../api";
import LoginInput from "../components/LoginInput";
import {
  BiUser,
  BsFillTelephoneFill,
  BiSolidMap,
  BiSolidNotepad,
} from "../asset/icons/index";

const CheckOut = () => {
  const [name, setName] = useState("");
  const [numberPhone, setNumberPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const dispacth = useDispatch();
  const [itemTotal, setItemTotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getCartItems(user?.user_id).then((items) => {
      dispacth(setCartItems(items));
    });
  }, []);

  useEffect(() => {
    let tot = 0;
    if (cart) {
      cart.map((data) => {
        tot = tot + parseFloat(data.productPrice) * data.quantity;
        setTotal(tot);
      });
    }
  }, [ cart]);

  const handlePayment = () => {};
  return (
    <div className="w-full flex flex-col items-center justify-center p-4">
      <h2>Đơn hàng của bạn</h2>
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          {cart &&
            cart.map((data) => (
              <div key={data?.productId}>
                <div className="flex flex-row items-start gap-4">
                  <div className="w-20 h-20 min-w-[80px] bg-violet-500">
                    <img
                      src={data?.productImage}
                      className="w-full h-full object-cover p-1"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col px-4 py-2 gap-2">
                    <p>{data?.productName}</p>
                    <p>{data?.quantity}</p>
                    <p>{formatCurrency(data?.productPrice)}</p>
                  </div>
                  <div className="flex flex-col">
                    <p>{itemTotal}</p>
                  </div>
                </div>
              </div>
            ))}
          <p>{formatCurrency(total)}</p>
        </div>
        <div className="flex flex-col gap-5 py-10">
          <LoginInput
            placeHolder={"Họ tên..."}
            icon={<BiUser className="text-2xl" />}
            inputState={name}
            inputStateFunc={setName}
            type="text"
          />
          <LoginInput
            placeHolder={"Số điện thoại..."}
            icon={<BsFillTelephoneFill className="text-2xl" />}
            inputState={numberPhone}
            inputStateFunc={setNumberPhone}
            type="text"
          />
          <LoginInput
            placeHolder={"Địa chỉ..."}
            icon={<BiSolidMap className="text-2xl" />}
            inputState={address}
            inputStateFunc={setAddress}
            type="text"
          />
          <LoginInput
            placeHolder={"Ghi chú..."}
            icon={<BiSolidNotepad className="text-2xl" />}
            inputState={note}
            inputStateFunc={setNote}
            type="text"
          />
        </div>
      </div>
      <button onClick={handlePayment()}>thanh toán</button>
    </div>
  );
};

export const formatCurrency = (value) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

export default CheckOut;

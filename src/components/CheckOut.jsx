import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems } from "../context/actions/cartActions";
import { getCartItems } from "../api";

const CheckOut = () => {
  
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
  }, [cart]);
  return (
    <div className="w-full flex items-center justify-center p-4">
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
                  <p>{data?.productPrice}</p>
                </div>
                <div className="flex flex-col">
                  <p>{itemTotal}</p>
                </div>
              </div>
            </div>
          ))}
        <p>{total}</p>
      </div>

      <div>
        {/* {user &&
          user.map((data) => (
            <div
              className="flex flex-col items-center justify-center"
              key={data?.user_id}>
              <p>{data?.name}</p>
            </div>
          ))} */}
      </div>
    </div>
  );
};

export default CheckOut;

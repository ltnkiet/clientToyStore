import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems } from "../context/actions/cartActions";
import { getCartItems } from "../api";

const CheckOut = () => {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const dispacth = useDispatch();
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
    <div className="w-full flex items-center justify-center">
      <div className="flex flex-col items-center">
        {cart &&
          cart.map((data) => (
            <div key={data?.productId}>
              <img src={data?.productImage} className="w-10 h-10" alt="" />
              <p>{data?.productName}</p>
              <p>{data?.productPrice}</p>
              <p>{data?.quantity}</p>
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

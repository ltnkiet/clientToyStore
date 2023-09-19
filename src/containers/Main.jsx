import React, { useEffect } from "react";
import "../asset/css/Loader.css";
import { FilterSection, Header, Home, HomeSlider, Cart, CheckOut, Footer } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../api/index";
import { setAllProduct } from "../context/actions/productAction";

const Main = () => {
  const products = useSelector((state) => state.products);
  const isCart = useSelector((state) => state.isCart)
  const dispatch = useDispatch();

  useEffect(() => {
    if (!products) {
      getAllProduct().then((data) => {
        dispatch(setAllProduct(data));
      });
    }
  },[products]);
  return (
    <main className="w-screen min-h-screen flex items-center justify-center flex-col bg-primary">
      <Header />
      <div className="w-full flex flex-col items-start justify-center mt-40 px-6 md:px-24 2xl:px-96 gap-12 pb-24">
        <Home />
        <HomeSlider />
        <FilterSection/>
      </div>
      {isCart && <Cart/>}
      {/* <CheckOut/> */}
      <Footer/>
    </main>
  );
};

export default Main;

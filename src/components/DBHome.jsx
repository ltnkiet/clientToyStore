import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct, getAllCategory } from "../api/index";
import { setAllProduct } from "../context/actions/productAction";
import { setAllCategory } from "../context/actions/categoryActions";

const DBHome = () => {

  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!products) {
      getAllProduct().then((data) => {
        dispatch(setAllProduct(data));
      });
    }
  }, []);

  const category = useSelector((state) => state.category);

  useEffect(() => {
    if (!category) {
      getAllCategory().then((data) => {
        dispatch(setAllCategory(data));
      });
    }
  }, []);

  return <div></div>;
};

export default DBHome;

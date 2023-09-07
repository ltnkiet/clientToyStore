import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../api/index";
import { setAllCategory } from "../context/actions/categoryActions";

const DBHome = () => {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!category) {
      getAllCategory().then((data) => {
        dispatch(setAllCategory(data));
      });
    }
  }, []);

  return <div>DBHome</div>;
};

export default DBHome;

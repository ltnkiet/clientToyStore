import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAllCategory } from "../context/actions/categoryActions";
import { getAllCategory, getAllProduct } from "../api/index";
import { setAllProduct } from "../context/actions/productAction";
import SliderCard from "./SliderCard";

const FilterSection = () => {
  const [categories, setCategories] = useState("Lego");

  const products = useSelector((state) => state.products);
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!products) {
      getAllProduct().then((data) => {
        dispatch(setAllProduct(data));
      });
    }
  }, []);

  useEffect(() => {
    if (!category) {
      getAllCategory().then((data) => {
        dispatch(setAllCategory(data));
      });
    }
  }, []);

  return (
    <motion.div className="w-full flex items-start justify-start flex-col">
      <div className="w-full flex items-center justify-between">
        <p
          className="text-2xl font-semibold capitalize text-headingColor relative
          before:absolute before:rounded-lg before:content before:w-20 before:h-1
          before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-violet-400 to-violet-600
          transition-all ease-in-out duration-100">
          Menu
        </p>
      </div>
      <div
        className="w-full flex items-center justify-center
        md:gap-8 overflow-x-scroll scrollbar-none">
        {category &&
          category.map((data, i) => (
            <FilterCard
              data={data}
              cat={categories}
              setCat={setCategories}
              index={i}
            />
          ))}
      </div>

      <div className="w-full flex items-center justify-center flex-wrap gap-2 mt-4">
        {products &&
          products
            .filter((data) => data.productCategory === categories)
            .map((data, i) => <SliderCard key={i} index={i} data={data} />)}
      </div>
    </motion.div>
  );
};

export const FilterCard = ({ data, index, cat, setCat }) => {
  return (
    <motion.div
      key={index}
      onClick={() => setCat(data.categoryName)}
      className="w-24 min-w-[94px] h-28 cursor-pointer
      flex flex-col gap-2 items-center justify-center duration-200 mx-4">
      <img src={data.categoryImage} className="w-12" />
      <p
        className={`text-lg text-black hover:text-violet-600
        ${cat === data.categoryName ? "text-violet-500" : "border-violet-500"}
      `}>
        {data.categoryName}
      </p>
    </motion.div>
  );
};

export default FilterSection;



export const setAllProduct = (products) => {
  return {
    type: "SET_ALL_PRODUCT",
    products: products,
  };
};

export const getAllProduct = (products) => {
  return {
    type: "GET_ALL_PRODUCT",
  };
};

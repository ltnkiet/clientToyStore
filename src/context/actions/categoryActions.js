export const setAllCategory = (category) => {
  return {
    type: "SET_ALL_CATEGORY",
    category: category,
  };
};

export const getAllCategory = (category) => {
  return {
    type: "GET_ALL_CATEGORY",
  };
};

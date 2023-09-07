import axios from "axios";

export const server = "http://127.0.0.1:5001/toystore-shop/us-central1/app";

// Json Web Token
export const validateUserJWTToken = async (token) => {
  try {
    const res = await axios.get(`${server}/api/users/jwtVerfication`, {
      headers: { Authorization: "Bearer " + token },
    });
    return res.data.data;
  } catch (err) {
    return null;
  }
};

// Add Category
export const addNewCategory = async (data) => {
  try {
    const res = await axios.post(`${server}/api/category`, { ...data });
    return res.data.data;
  } catch (error) {
    return null;
  }
};
// Get Category
export const getAllCategory = async () => {
  try {
    const res = await axios.get(`${server}/api/category`);
    return res.data.data;
  } catch (error) {
    return null;
  }
};

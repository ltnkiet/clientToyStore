import axios from "axios";

//export const server = "http://127.0.0.1:5001/toystore-shop/us-central1/app";
export const server = "http://127.0.0.1:5001/toyshop-be6eb/us-central1/app/api";

// Json Web Token
export const validateUserJWTToken = async (token) => {
  try {
    const res = await axios.get(`${server}/users/jwtVerfication`, {
      headers: { Authorization: "Bearer " + token },
    });
    return res.data.data;
  } catch (err) {
    return null;
  }
};

//Get All User
export const getAllUser = async () => {
  try {
    const res = await axios.get(`${server}/users`);
    return res.data.data;
  } catch (error) {
    return null;
  }
};

// Add Category
export const addNewCategory = async (data) => {
  try {
    const res = await axios.post(`${server}/category`, { ...data });
    return res.data.data;
  } catch (error) {
    return null;
  }
};
// Get Category
export const getAllCategory = async () => {
  try {
    const res = await axios.get(`${server}/category`);
    return res.data.data;
  } catch (error) {
    return null;
  }
};

//Add Product
export const addNewProduct = async (data) => {
  try {
    //Lấy danh sách tất cả sản phẩm
    const allProducts = await getAllProduct();
    // Kiểm tra xem sản phẩm với productName đã tồn tại chưa
    const isProductExists = allProducts.some(
      (product) => product.productName === data.productName
    );
    if (isProductExists) {
      // Nếu sản phẩm đã tồn tại, xuất thông báo lỗi
      return { error: "Sản phẩm đã tồn tại" };
    }
    const res = await axios.post(`${server}/product`, { ...data });
    return res.data.data;
  } catch (error) {
    return null;
  }
};

// Get Products
export const getAllProduct = async () => {
  try {
    const res = await axios.get(`${server}/product`);
    return res.data.data;
  } catch (error) {
    return null;
  }
};

// Get a Product
export const getAProduct = async (productId) => {
  try {
    const res = await axios.get(`${server}/product/${productId}`);
    return res.data.data;
  } catch (error) {
    return null;
  }
};

// Update Product
export const updateProduct = async (productId, updatedData) => {
  try {
    const res = await axios.put(`${server}/product/${productId}`, {
      ...updatedData,
    });
    return res.data.data;
  } catch (error) {
    return null;
  }
};

// Delete Product
export const DeleteProduct = async (productId) => {
  try {
    const res = await axios.delete(`${server}/product/${productId}`);
    return res.data.data;
  } catch (error) {
    return null;
  }
};

// Add item to Cart
export const addItemToCart = async (user_id, data) => {
  try {
    const res = await axios.post(`${server}/product/addToCart/${user_id}`, {
      ...data,
    });
    return res.data.data;
  } catch (error) {
    return null;
  }
};

//Get Cart items
export const getCartItems = async (user_id) => {
  try {
    const res = await axios.get(`${server}/product/getCart/${user_id}`);
    return res.data.data;
  } catch (error) {
    return null;
  }
};

//Cart increment
export const updateItemQty = async (user_id, productId, type) => {
  try {
    const res = axios.post(`${server}/product/updateCart/${user_id}`, null, {
      params: { productId: productId, type: type },
    });
    return res.data.data;
  } catch (error) {
    return null;
  }
};
//Cart decrement

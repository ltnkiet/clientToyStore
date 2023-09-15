import React, { useState } from "react";
import DataTable from "./DataTable";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DeleteProduct, getAllProduct, updateProduct } from "../api";
import { setAllProduct } from "../context/actions/productAction";
import { alertNull, alertSuccess } from "../context/actions/alertActions";

const DBProducts = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [selectedProduct, setSelectedProduct] = useState(null);
  // const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // const openEditModal = (rowData) => {
  //   setSelectedProduct(rowData);
  //   setIsEditModalOpen(true);
  // };

  // // Function to close the edit modal
  // const closeEditModal = () => {
  //   setSelectedProduct(null);
  //   setIsEditModalOpen(false);
  // };

  // // Function to update a product
  // const handleUpdateProduct = async (updatedData) => {
  //   try {
  //     const updatedProduct = await updateProduct(
  //       selectedProduct.productId,
  //       updatedData
  //     );
  //     if (updatedProduct) {
  //       dispatch(alertSuccess("Updated Successfully"));
  //       getAllProduct().then((data) => {
  //         dispatch(setAllProduct(data));
  //       });
  //       closeEditModal();
  //     }
  //   } catch (error) {
  //     // Handle error here
  //   }
  // };

  return (
    //className="w-full flex items-center justify-self-center gap-4 pt-6"

    <div className="gap-2 pt-6">
      <DataTable
        title={"Danh sách sản phẩm"}
        column={[
          {
            title: "Ảnh bìa",
            field: "productImage",
            render: (rowData) => (
              <img
                src={rowData.productImage}
                className="w-32 h-16 object-contain rounded-md"
              />
            ),
          },
          { title: "Tên sản phẩm", field: "productName" },
          { title: "Danh mục", field: "productCategory" },
          { title: "Số lượng", field: "productQty" },
          {
            title: "Giá",
            field: "productPrice",
            render: (rowData) => (
              <p className="font-semibold text-textColor gap-1">
                {Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(rowData.productPrice)}
              </p>
            ),
          },
          { title: "Mô tả", field: "productDes" },
        ]}
        data={products}
        actions={[
          {
            icon: "add",
            isFreeAction: true,
            onClick: (event) => {
              navigate("/dashboard/newProduct");
            },
          },
          {
            icon: "edit",
            tooltip: "Edit Data",
            onClick: (event, rowData) => {
              alert("Updating");
            },
          },
          {
            icon: "delete",
            tooltip: "Delete Data",
            onClick: (event, rowData) => {
              if (
                window.confirm(
                  `Bạn có muốn xóa sản phẩm ${rowData.productName}`
                )
              ) {
                DeleteProduct(rowData.productId).then((res) => {
                  dispatch(alertSuccess("Deleted Success"));
                  setInterval(() => {
                    dispatch(alertNull);
                  }, 3000);
                  getAllProduct().then((data) => {
                    dispatch(setAllProduct(data));
                  });
                });
              }
            },
          },
        ]}
      />

      {/* Edit Product Modal
      {selectedProduct && (
        // Render a modal or a separate page for editing the product
        // You can use state or a library like react-modal for the modal implementation
        // Example:
        <EditProductModal
          product={selectedProduct}
          onUpdateProduct={handleUpdateProduct}
          onClose={closeEditModal}
        />
      )} */}
    </div>
  );
};

export default DBProducts;

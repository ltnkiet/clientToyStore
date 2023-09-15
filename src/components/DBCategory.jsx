import React, { useEffect } from "react";
import DataTable from "./DataTable";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const DBCategory = () => {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="gap-4 pt-6">
      <DataTable
        title={"Danh sách danh mục"}
        column={[
          {
            title: "Ảnh bìa",
            field: "categoryImage",
            render: (rowData) => (
              <img
                src={rowData.categoryImage}
                className="w-32 h-16 object-contain rounded-md"
              />
            ),
          },
          { title: "Danh mục", field: "categoryName" },
        ]}
        data={category}
        actions={[
          {
            icon: "add",
            isFreeAction: true,
            onClick: (event) => {
              navigate("/dashboard/newCategory");
            },
          },
          {
            icon: "edit",
            tooltip: "Edit Data",
            onClick: (event, rowData) => {
              alert("Bạn có muốn cập nhật lại " + rowData.categoryName);
            },
          },
          {
            icon: "delete",
            tooltip: "Delete Data",
            onClick: (event, rowData) => {
              alert("Bạn có muốn xóa " + rowData.categoryName);
            },
          },
        ]}
      />
    </div>
  );
};

export default DBCategory;

import React from "react";
import DataTable from "./DataTable";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const DBCategory = () => {

  const category = useSelector((state) => state.category);
  
  return (
    <div className="flex flex-col items-center justify-self-center gap-4 pt-6 w-full relative">
      <NavLink
        to={"/dashboard/newCategory"}
        className="absolute left-0 p-2 rounded-md bg-green-400 font-semibold text-primary hover:bg-green-600">
        Thêm danh mục mới
      </NavLink>
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
            icon: "edit",
            tooltip: "Edit Data",
            // onclick: (event, rowData) => {
            //   alert("Bạn có muốn cập nhật lại " + rowData.categoryName);
            // },
          },
          {
            icon: "delete",
            tooltip: "Delete Data",
            // onclick: (event, rowData) => {
            //   alert("Bạn có muốn xóa " + rowData.categoryName);
            // },
          },
        ]}
      />
    </div>
  );
};

export default DBCategory;

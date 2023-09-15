import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../api";
import { setAllUserDetails } from "../context/actions/allUsersAtion";
import DataTable from "./DataTable";
import Avatar from "../asset/img/avatar.png";

const DBUsers = () => {
  
  const allUsers = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!allUsers) {
      getAllUser().then((data) => {
        dispatch(setAllUserDetails(data));
      });
    }
  }, []);

  return (
    <div className="pt-6">
      <DataTable
        title={"Danh sách khách hàng"}
        column={[
          {
            title: "Ảnh đại diện",
            field: "productImage",
            render: (rowData) => (
              <img
                src={rowData.picture ? rowData.picture : Avatar}
                className="w-32 h-16 object-contain rounded-md"
              />
            ),
          },
          { title: "Họ tên", field: "name" },
          { title: "Email", field: "email" },
          {
            title: "Verified",
            field: "email_verified",
            render: (rowData) => (
              <p
                className={`px-2 py-1 w-32 text-center text-primary rounded-md
                ${rowData.email_verified ? "bg-emerald-500" : "bg-red-500"}`}>
                {rowData.email_verified ? "Verified" : "Not Verified"}
              </p>
            ),
          },
        ]}
        //data={allUsers}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit Data",
            onclick: (event, rowData) => {
              alert("Bạn có muốn cập nhật lại ");
            },
          },
          {
            icon: "delete",
            tooltip: "Delete Data",
            onclick: (event, rowData) => {
              alert("Xóa");
            },
          },
        ]}
      />
    </div>
  );
};

export default DBUsers;

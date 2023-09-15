import React, { useState } from "react";
import { Spinner } from ".";
import { FiUploadCloud } from "react-icons/fi";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../config/firebase.config";
import { useDispatch, useSelector } from "react-redux";
import {
  alertNull,
  alertDanger,
  alertSuccess,
} from "../context/actions/alertActions";
import { motion } from "framer-motion";
import { btnClick } from "../animation";
import { MdDelete } from "../asset/icons/index";
import { addNewCategory, getAllCategory } from "../api";
import { setAllCategory } from "../context/actions/categoryActions";

const DBNewCategory = () => {
  const [catName, setCatName] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [imageDownloadURL, setimageDownloadURL] = useState(null);
  const [progress, setProgress] = useState(null);

  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  const uploadImage = (e) => {
    setisLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(
      storage,
      `category_thumbnail/${Date.now()}_${imageFile.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (err) => {
        dispatch(alertDanger(`Error: ${err}`));
        setTimeout(() => {
          dispatch(alertNull());
        });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setimageDownloadURL(downloadURL);
          setisLoading(false);
          setProgress(null);
          dispatch(alertSuccess("Tải ảnh lên thành công"));
          setTimeout(() => {
            dispatch(alertNull());
          }, 2000);
        });
      }
    );
  };

  const deleteImage = () => {
    setisLoading(true);
    const deleteRef = ref(storage, imageDownloadURL);
    deleteObject(deleteRef).then(() => {
      setimageDownloadURL(null);
      setisLoading(false);
      dispatch(alertSuccess("Xóa ảnh thành công"));
      setTimeout(() => {
        dispatch(alertNull());
      }, 2000);
    });
  };

  const submitCategory = () => {
    const data = {
      categoryName: catName,
      categoryImage: imageDownloadURL,
    };

    getAllCategory().then((category) => {
      const existingCategory = category.find(
        (cat) => cat.categoryName.toLowerCase() === catName.toLowerCase()
      );

      if (existingCategory) {
        dispatch(alertDanger(`Danh mục ${catName} đã tồn tại.`));
        setTimeout(() => {
          dispatch(alertNull());
        }, 2000);
      } else {
        addNewCategory(data).then((res) => {
          console.log(res);
          dispatch(alertSuccess("Hoàn tất"));
          setTimeout(() => {
            dispatch(alertNull());
          }, 2000);
          setimageDownloadURL(null);
          setCatName("");
        });
        getAllCategory().then((data) => {
          dispatch(setAllCategory(data));
        });
      }
    });
  };

  return (
    <div className="flex items-center justify-center flex-col pt-6 px-24 w-[80%]">
      <div className="border border-gray-300 rounded-md p-4 w-full flex flex-col items-center justify-center gap-4">
        <InputValueField
          type="text"
          placeHolder={"Tên danh mục"}
          stateValue={catName}
          stateFunc={setCatName}
        />
        <div className="w-full bg-card backdrop-blur-md h-370 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
          {isLoading ? (
            <div className="w-full h-full flex flex-col items-center justify-evenly px-24">
              <Spinner />
              {Math.round(progress > 0) && (
                <div className="w-full flex flex-col items-center justify-center gap-2">
                  <div className="flex justify-between w-full">
                    <span className="text-base font-medium text-textColor">
                      Tải lên
                    </span>
                    <span className="text-sm font-medium text-textColor">
                      {Math.round(progress) > 0 && (
                        <>{`${Math.round(progress)}%`}</>
                      )}
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2.5 ">
                    <div
                      className="bg-red-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                      style={{ width: `${Math.round(progress)}%` }}></div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              {!imageDownloadURL ? (
                <>
                  <label>
                    <div className="flex flex-col items-center justify-center h-full w-full cursor-pointer">
                      <div className="flex flex-col justify-center items-center cursor-pointer">
                        <p className="font-bold text-4xl">
                          <FiUploadCloud />
                        </p>
                        <p className="text-lg text-textColor">Tải ảnh lên...</p>
                      </div>
                    </div>
                    <input
                      type="file"
                      name="upload-image"
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="w-full h-full relative overflow-hidden rounded-md">
                    <motion.img
                      src={imageDownloadURL}
                      className="w-full h-full object-contain"
                    />
                    <motion.button
                      {...btnClick}
                      type="button"
                      className="absolute top-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 trasition-all ease-in-out"
                      onClick={() => deleteImage(imageDownloadURL)}>
                      <MdDelete className="-rotate-0" />
                    </motion.button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <motion.button
          {...btnClick}
          onClick={submitCategory}
          className="w-9/12 py-2 rounded-md bg-green-400 text-primary hover:bg-green-600">
          Lưu
        </motion.button>
      </div>
    </div>
  );
};
export default DBNewCategory;

export const InputValueField = ({
  type,
  placeHolder,
  stateValue,
  stateFunc,
}) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeHolder}
        className="w-full px-4 py-3 bg-lightOverlay shadow-md outline-none rounded-md border border-gray-300 focus:border-violet-400 z-20"
        value={stateValue}
        onChange={(e) => stateFunc(e.target.value)}
      />
    </>
  );
};

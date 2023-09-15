import React, { useEffect, useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import LoginInput from "../components/LoginInput";
import { RiLockPasswordLine } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { btnClick } from "../animation";
import { setUserDetails } from "../context/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import loginBackGround from "../asset/img/background.jpg";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { app } from "../config/firebase.config";
import { validateUserJWTToken } from "../api";

import { useNavigate } from "react-router-dom";
import { alertInfor, alertWarning } from "../context/actions/alertActions";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [pass, setPass] = useState("");
  const [cfPass, setCfPass] = useState("");

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const alert = useSelector((state) => state.alert);

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user]);

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      firebaseAuth.onAuthStateChanged((cred) => {
        if (cred) {
          cred.getIdToken().then((token) => {
            validateUserJWTToken(token).then((data) => {
              dispatch(setUserDetails(data));
            });
            console.log(token);
            navigate("/", { replace: true });
          });
        }
      });
    });
  };

  //lỗi
  const signUpWithEmailPass = async () => {
    if (userEmail === "" || pass === "" || cfPass === "") {
      dispatch(alertInfor("Không được để trống"));
    } else {
      if (pass === cfPass) {
        setUserEmail("");
        setCfPass("");
        setPass("");
        await createUserWithEmailAndPassword(
          firebaseAuth,
          userEmail,
          pass
        ).then((userCred) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {
                validateUserJWTToken(token).then((data) => {
                  dispatch(setUserDetails(data));
                });
                navigate("/", { replace: true });
              });
            }
          });
        });
        console.log("Equal");
      } else {
        dispatch(alertWarning("Mật khẩu không trùng khớp"));
      }
    }
  };

  const signInWithEmailPass = async () => {
    if (userEmail !== "" && pass !== "") {
      await signInWithEmailAndPassword(firebaseAuth, userEmail, pass).then(
        (userCred) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {
                console.log(token);
                validateUserJWTToken(token).then((data) => {
                  dispatch(setUserDetails(data));
                });
                navigate("/", { replace: true });
              });
            }
          });
        }
      );
    } else {
      dispatch(alertWarning("Mật khẩu không hợp lệ"));
    }
  };

  return (
    <div className="w-screen h-screen relative flex">
      <img
        src={loginBackGround}
        className="w-full h-full absolute top-0 left-0 object-cover"
      />

      <div className="flex flex-col items-center bg-lightOverlay backdrop-blur-md z-10 px-10 py-10">
        <h2 className="text-3xl text-headingColor font-semibold pb-5 flex gap-3">
          Welcome to <p className="text-violet-700">Toy Store</p>
        </h2>

        <div className="w-full flex flex-col items-center gap-6">
          <LoginInput
            placeHolder={"Email..."}
            icon={<HiOutlineMail className="text-2xl" />}
            inputState={userEmail}
            inputStateFunc={setUserEmail}
            type="email"
            isSingUp={isSignUp}
          />
          <LoginInput
            placeHolder={"Mật khẩu..."}
            icon={<RiLockPasswordLine className="text-2xl" />}
            inputState={pass}
            inputStateFunc={setPass}
            type="password"
            isSingUp={isSignUp}
          />
          {isSignUp && (
            <LoginInput
              placeHolder={"Nhập lại mật khẩu..."}
              icon={<RiLockPasswordLine className="text-2xl" />}
              inputState={cfPass}
              inputStateFunc={setCfPass}
              type="password"
              isSingUp={isSignUp}
            />
          )}
          {!isSignUp ? (
            <p>
              Bạn chưa có tài khoản:{"  "}
              <motion.button
                {...btnClick}
                className="text-violet-600 underline cursor-pointer bg-transparent"
                onClick={() => setIsSignUp(true)}>
                Tạo tài khoản
              </motion.button>
            </p>
          ) : (
            <p>
              Bạn đã có tài khoản:{"  "}
              <motion.button
                {...btnClick}
                className="text-violet-600 underline cursor-pointer bg-transparent"
                onClick={() => setIsSignUp(false)}>
                Đăng nhập tại đây
              </motion.button>
            </p>
          )}
          {!isSignUp ? (
            <motion.button
              {...btnClick}
              onClick={signInWithEmailPass}
              className="w-full px-4 py-2 rounded-md capitalize cursor-pointer bg-violet-600 text-white text-xl">
              Đăng nhập
            </motion.button>
          ) : (
            <motion.button
              {...btnClick}
              onClick={signUpWithEmailPass}
              className="w-full px-4 py-2 rounded-md capitalize cursor-pointer bg-violet-600 text-white text-xl">
              Đăng ký
            </motion.button>
          )}
        </div>
        <div className="flex items-center justify-between gap-16 py-7">
          <div className="w-24 h-[1px] rounded-md bg-violet-500"></div>
          <p className="text-violet-500">or</p>
          <div className="w-24 h-[1px] rounded-md bg-violet-500"></div>
        </div>
        <motion.button
          {...btnClick}
          onClick={loginWithGoogle}
          className="flex items-center justify-center px-4 py-3 w-full gap-4 
          backdrop-blur-md rounded-md cursor-pointer 
          bg-violet-600 text-white text-xl">
          <FcGoogle className="text-2xl border p-[2px] bg-white rounded-md" />
          <p>Đăng nhập với Google</p>
        </motion.button>
      </div>
    </div>
  );
};

export default Login;

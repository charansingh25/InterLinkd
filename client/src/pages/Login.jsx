import { useFileHandler, useInputValidation } from "6pp";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
import { server } from "../constants/config";
import { userExists } from "../redux/reducers/auth";
import { usernameValidator } from "../utils/validators";
import userAvatar from "./../assets/avatar/user.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const toggleLogin = () => setIsLogin((prev) => !prev);

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("");

  const avatar = useFileHandler("single");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Logging In...");

    setIsLoading(true);
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        {
          username: username.value,
          password: password.value,
        },
        config
      );
      console.log("Dispatching userExists:", data.user);
      dispatch(userExists(data.user));
      navigate("/home");
      toast.success(data.message, {
        id: toastId,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Signing Up...");
    setIsLoading(true);

    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name.value);
    formData.append("bio", bio.value);
    formData.append("username", username.value);
    formData.append("password", password.value);

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
        formData,
        config
      );

      dispatch(userExists(data.user));
      toast.success(data.message, {
        id: toastId,
      });
      navigate("/home");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="bg-[#2f2f2f] min-h-screen flex items-center justify-center">
      <div className="bg-[#212121] rounded-lg shadow-lg border-yellow-400 border-2 w-full max-w-md p-8">
        <h1 className="text-2xl font-bold uppercase text-center text-yellow-400 mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h1>

        <form
          onSubmit={isLogin ? handleLogin : handleSignUp}
          className="space-y-4"
        >
          {!isLogin && (
            <>
              {/* Avatar Upload */}
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <img
                    src={avatar.preview || userAvatar}
                    alt="Avatar"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <label className="absolute bottom-0 right-0 bg-yellow-400 p-2 rounded-full cursor-pointer">
                    <input
                      type="file"
                      className="hidden"
                      onChange={avatar.changeHandler}
                    />
                    <span className="text-black font-bold">+</span>
                  </label>
                </div>
              </div>

              {avatar.error && (
                <p className="text-red-500 text-sm text-center">
                  {avatar.error}
                </p>
              )}

              {/* Name Field */}
              <input
                type="text"
                placeholder="Name"
                value={name.value}
                onChange={name.changeHandler}
                className="w-full px-4 py-2 text-sm rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-yellow-400"
                required
              />

              {/* Bio Field */}
              <textarea
                placeholder="Bio"
                value={bio.value}
                onChange={bio.changeHandler}
                className="w-full px-4 py-2 text-sm rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-yellow-400"
                rows={3}
                required
              />
            </>
          )}

          {/* Username Field */}
          <input
            type="text"
            placeholder="Username"
            value={username.value}
            onChange={username.changeHandler}
            className="w-full px-4 py-2 text-sm rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-yellow-400"
            required
          />
          {username.error && (
            <p className="text-red-500 text-sm">{username.error}</p>
          )}

          {/* Password Field */}
          <input
            type="password"
            placeholder="Password"
            value={password.value}
            onChange={password.changeHandler}
            className="w-full px-4 py-2 text-sm rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-yellow-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-bold py-2 rounded-lg hover:bg-yellow-500 transition disabled:opacity-50"
            disabled={isLoading}
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={toggleLogin}
            className="text-yellow-400 hover:underline"
          >
            {isLogin ? "Sign Up Instead" : "Login Instead"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

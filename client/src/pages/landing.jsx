import React from "react";
import LandingImg from "./../assets/main-img.png";
import { Outlet } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";

const Landing = ({ onConnect }) => {
  
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/login");
  };

  return (
    <div className="relative w-screen h-screen">
      {/* Fullscreen background image */}
      <img
        src={LandingImg}
        alt="land-img"
        className="absolute inset-0 object-cover w-full h-full z-0"
      />

      {/* Centered text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
        <div>
          <span>
            <h1 className="text-yellow-400 text-8xl font-black tracking-wider">
              InterLinkd
            </h1>
          </span>
          <p className="mt-4 text-lg text-white dark:text-gray-300 border-2 border-yellow-400 rounded-lg uppercase font-bold p-2 ">
            networking and messaging platform
          </p>
        

        {/* <div className="mt-8"> */}
          <button
            type="button"
            onClick={handleNavigate}
            className="mt-8 text-yellow-300 font-bold hover:text-black border border-yellow-400 hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-yellow-300 rounded-lg text-lg px-5 py-2.5 w-2/3 text-center me-2 mb-2"
          >
            Let's Dive In
          </button>
        </div>
      </div>

      {/* Overlay for Outlet */}
      {/* <div className="absolute right-10 top-1/2 transform -translate-y-1/2 bg-white/40 dark:bg-black/40 backdrop-blur-lg rounded-lg p-10 z-20">
        <Outlet />
      </div> */}
    </div>
  );
};

export default Landing;

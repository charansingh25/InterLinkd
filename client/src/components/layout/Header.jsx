import {
  AppBar,
  Backdrop,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { Suspense, lazy, useState } from "react";
import { orange } from "../../constants/color";
import {
  Add as AddIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../constants/config";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userNotExists } from "../../redux/reducers/auth";
import {
  setIsMobile,
  setIsNewGroup,
  setIsNotification,
  setIsSearch,
} from "../../redux/reducers/misc";
import { resetNotificationCount } from "../../redux/reducers/chat";

const SearchDialog = lazy(() => import("../specific/Search"));
const NotifcationDialog = lazy(() => import("../specific/Notifications"));
const NewGroupDialog = lazy(() => import("../specific/NewGroup"));

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isSearch, isNotification, isNewGroup } = useSelector(
    (state) => state.misc
  );
  const { notificationCount } = useSelector((state) => state.chat);

  const handleMobile = () => dispatch(setIsMobile(true));

  const openSearch = () => dispatch(setIsSearch(true));

  const openNewGroup = () => {
    dispatch(setIsNewGroup(true));
  };

  const openNotification = () => {
    dispatch(setIsNotification(true));
    dispatch(resetNotificationCount());
  };

  const navigateToGroup = () => navigate("/groups");

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });
      dispatch(userNotExists());
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="flex items-center bg-[#2f2f2f] h-16 shadow-md border-b-2 border-yellow-300">
        <div className="hidden tracking-widest sm:block text-yellow-300 font-bold text-3xl px-4">
          InterLinkd
        </div>

        <button
          className="block sm:hidden text-white px-4"
          onClick={handleMobile}
        >
          <MenuIcon />
        </button>

        <div className="flex-grow" />

        <div className="flex space-x-4 px-4">
          <IconBtn
            title={"Search"}
            icon={<SearchIcon />}
            onClick={openSearch}
          />

          <IconBtn
            title={"New Group"}
            icon={<AddIcon />}
            onClick={openNewGroup}
          />

          <IconBtn
            title={"Manage Groups"}
            icon={<GroupIcon />}
            onClick={navigateToGroup}
          />

          <IconBtn
            title={"Notifications"}
            icon={<NotificationsIcon />}
            onClick={openNotification}
            value={notificationCount}
          />

          <IconBtn
            title={"Logout"}
            icon={<LogoutIcon />}
            onClick={logoutHandler}
          />
        </div>
      </div>

      {isSearch && (
        <Suspense
          fallback={
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              Loading...
            </div>
          }
        >
          <SearchDialog />
        </Suspense>
      )}

      {isNotification && (
        <Suspense
          fallback={
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              Loading...
            </div>
          }
        >
          <NotifcationDialog />
        </Suspense>
      )}

      {isNewGroup && (
        <Suspense
          fallback={
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              Loading...
            </div>
          }
        >
          <NewGroupDialog />
        </Suspense>
      )}
    </>
  );
};

const IconBtn = ({ title, icon, onClick, value }) => {
  return (
    <div className="relative group">
      <button
        className="text-yellow-400 hover:bg-yellow-400 hover:text-black rounded-full p-2"
        onClick={onClick}
        title={title}
      >
        {value ? (
          <span className="relative inline-block">
            {icon}
            <span className="absolute top-0 right-0 block h-2 w-2 transform translate-x-1/2 -translate-y-1/2 bg-yellow-400 rounded-full"></span>
          </span>
        ) : (
          icon
        )}
      </button>
    </div>
  );
};
export default Header;

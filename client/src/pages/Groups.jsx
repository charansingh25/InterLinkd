import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Done as DoneIcon,
  Edit as EditIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { Suspense, lazy, memo, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LayoutLoader } from "../components/layout/Loaders";
import AvatarCard from "../components/shared/AvatarCard";
import { Link } from "../components/styles/StyledComponents";
import { bgGradient, matBlack } from "../constants/color";
import { useDispatch, useSelector } from "react-redux";
import UserItem from "../components/shared/UserItem";
import { useAsyncMutation, useErrors } from "../hooks/hook";
import {
  useChatDetailsQuery,
  useDeleteChatMutation,
  useMyGroupsQuery,
  useRemoveGroupMemberMutation,
  useRenameGroupMutation,
} from "../redux/api/api";
import { setIsAddMember } from "../redux/reducers/misc";
import groupAvatar from "./../assets/avatar/group2.png";

const ConfirmDeleteDialog = lazy(() =>
  import("../components/dialogs/ConfirmDeleteDialog")
);
const AddMemberDialog = lazy(() =>
  import("../components/dialogs/AddMemberDialog")
);

const Groups = () => {
  const chatId = useSearchParams()[0].get("group");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAddMember } = useSelector((state) => state.misc);

  const myGroups = useMyGroupsQuery("");

  const groupDetails = useChatDetailsQuery(
    { chatId, populate: true },
    { skip: !chatId }
  );

  const [updateGroup, isLoadingGroupName] = useAsyncMutation(
    useRenameGroupMutation
  );

  const [removeMember, isLoadingRemoveMember] = useAsyncMutation(
    useRemoveGroupMemberMutation
  );

  const [deleteGroup, isLoadingDeleteGroup] = useAsyncMutation(
    useDeleteChatMutation
  );

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);

  const [groupName, setGroupName] = useState("");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");

  const [members, setMembers] = useState([]);

  const errors = [
    {
      isError: myGroups.isError,
      error: myGroups.error,
    },
    {
      isError: groupDetails.isError,
      error: groupDetails.error,
    },
  ];

  useErrors(errors);

  useEffect(() => {
    const groupData = groupDetails.data;
    if (groupData) {
      setGroupName(groupData.chat.name);
      setGroupNameUpdatedValue(groupData.chat.name);
      setMembers(groupData.chat.members);
    }

    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setMembers([]);
      setIsEdit(false);
    };
  }, [groupDetails.data]);

  const navigateBack = () => {
    navigate("/home");
  };

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMobileClose = () => setIsMobileMenuOpen(false);

  const updateGroupName = () => {
    setIsEdit(false);
    updateGroup("Updating Group Name...", {
      chatId,
      name: groupNameUpdatedValue,
    });
  };

  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
  };

  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
  };

  const openAddMemberHandler = () => {
    dispatch(setIsAddMember(true));
  };

  const deleteHandler = () => {
    deleteGroup("Deleting Group...", chatId);
    closeConfirmDeleteHandler();
    navigate("/groups");
  };

  const removeMemberHandler = (userId) => {
    removeMember("Removing Member...", { chatId, userId });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 h-screen">
      {/* Groups List */}
      <div className="hidden sm:block bg-[#2f2f2f] overflow-auto">
        <GroupsList myGroups={myGroups?.data?.groups} chatId={chatId} />
      </div>

      {/* Group Details */}
      <div className="col-span-3 flex flex-col items-center p-6 bg-black/85">
        {/* Navigation Buttons */}
        <div className="absolute top-4 right-4">
          <button
            className="p-3 px-6 bg-black text-white rounded-lg hover:bg-gray-700"
            onClick={navigateBack}
          >
            Back
          </button>
        </div>

        {/* Group Name */}
        {groupName && (
          <div className="flex items-center justify-center my-4">
            {isEdit ? (
              <>
                <input
                  type="text"
                  value={groupNameUpdatedValue}
                  onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
                  className="border border-gray-300 text-white rounded-md p-2"
                />
                <button
                  className="ml-2 bg-green-500 text-white p-2 rounded"
                  onClick={updateGroupName}
                  disabled={isLoadingGroupName}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-yellow-300">
                  {groupName}
                </h1>
                <button
                  className="ml-2 bg-blue-500 text-white p-2 rounded"
                  onClick={() => setIsEdit(true)}
                  disabled={isLoadingGroupName}
                >
                  Edit
                </button>
              </>
            )}
          </div>
        )}

        {/* Members Section */}
        <div className="flex flex-col w-full max-w-4xl mt-4 text-white">
          <h2 className="text-2xl font-semibold text-white mb-4">Members</h2>
          <div className="overflow-auto h-48">
            {isLoadingRemoveMember ? (
              <div className="flex justify-center items-center h-full">
                <div className="spinner-border animate-spin w-8 h-8 border-4 border-t-blue-500 rounded-full" />
              </div>
            ) : (
              members.map((member) => (
                <UserItem
                  key={member._id}
                  user={member}
                  styling="p-4 border rounded-md shadow mb-2"
                  handler={() =>
                    removeMember("Removing Member...", {
                      chatId,
                      userId: member._id,
                    })
                  }
                />
              ))
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row mt-4 gap-4">
          <button
            className="bg-red-500 text-white py-2 px-4 rounded"
            onClick={() => setConfirmDeleteDialog(true)}
          >
            Delete Group
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={() => dispatch(setIsAddMember(true))}
          >
            Add Member
          </button>
        </div>
      </div>

      {/* Confirm Delete Dialog */}
      {confirmDeleteDialog && (
        <Suspense fallback={<div>Loading...</div>}>
          <ConfirmDeleteDialog
            open={confirmDeleteDialog}
            handleClose={() => setConfirmDeleteDialog(false)}
            deleteHandler={deleteHandler}
          />
        </Suspense>
      )}

      {/* Add Member Dialog */}
      {isAddMember && (
        <Suspense fallback={<div>Loading...</div>}>
          <AddMemberDialog chatId={chatId} />
        </Suspense>
      )}
    </div>
  );
};

const GroupsList = ({ myGroups = [], chatId }) => (
  <div className="flex flex-col p-4">
    {myGroups.length > 0 ? (
      myGroups.map((group) => (
        <Link
          to={`?group=${group._id}`}
          className={`p-4 rounded-md mb-2 ${
            group._id === chatId ? "bg-gray-300" : "hover:bg-yellow-300"
          }`}
          key={group._id}
        >
          <div className="flex items-center">
            <img
              src={group.avatar || groupAvatar}
              alt={group.name}
              className="w-10 h-10 rounded-full mr-4"
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop in case fallback fails
                e.target.src = groupAvatar; // Set fallback image
              }}
            />
            <p className="font-bold text-white">{group.name}</p>
          </div>
        </Link>
      ))
    ) : (
      <p className="text-center text-gray-500">No groups available</p>
    )}
  </div>
);

export default Groups;

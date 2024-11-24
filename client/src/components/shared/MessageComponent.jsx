import { Box, Typography } from "@mui/material";
import React, { memo } from "react";
import { lightBlue } from "../../constants/color";
import moment from "moment";
import { fileFormat } from "../../lib/features";
import RenderAttachment from "./RenderAttachment";
import { motion } from "framer-motion";

const MessageComponent = ({ message, user }) => {
  const { sender, content, attachments = [], createdAt } = message;

  const sameSender = sender?._id === user?._id;

  const timeAgo = moment(createdAt).fromNow();

  return (
    <motion.div
      initial={{ opacity: 0, x: "-100%" }}
      whileInView={{ opacity: 1, x: 0 }}
      className="flex flex-col w-full mb-4"
    >
      {/* Message Container */}
      <div
        className={`${
          sameSender
            ? "self-end bg-gray-900 text-white"
            : "self-start bg-gray-800 text-yellow-400"
        } rounded-lg p-2 max-w-max w-fit`}
      >
        {/* Sender Name */}
        {!sameSender && (
          <div className="text-blue-400 font-semibold text-xs">
            {sender.name}
          </div>
        )}

        {/* Message Content */}
        {content && <div className="text-sm mt-1">{content}</div>}

        {/* Attachments */}
        {attachments.length > 0 &&
          attachments.map((attachment, index) => {
            const url = attachment.url;
            const file = fileFormat(url);

            return (
              <div key={index} className="mt-2">
                <a
                  href={url}
                  target="_blank"
                  download
                  className="text-black hover:underline"
                >
                  {RenderAttachment(file, url)}
                </a>
              </div>
            );
          })}

        {/* Time Ago */}
        <div className="text-xs text-gray-500 mt-1">{timeAgo}</div>
      </div>
    </motion.div>
  );
};

export default memo(MessageComponent);

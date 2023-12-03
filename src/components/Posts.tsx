import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegComment } from "react-icons/fa";
import { motion } from "framer-motion";
const Posts = ({ postData }) => {
  const navigation = useNavigate();
  const handleClick = () => {
    navigation(`/comments/${postData.id}`);
    console.log(postData.title.slice(0, 4));
  };

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="bg-gradient-to-r from-cyan-50 to-blue-100 p-4 gap-3 rounded-lg mt-4 w-1/4 "
        initial={{ y: 0 }}
        animate={{
          y: [0, -10, 0],
          transition: { type: "spring", stiffness: 300, damping: 10 },
        }}
        whileHover={{ scale: 1.1 }}
      >
        <div className="flex justify-center gap-6 ">
          <div className="custom-gray border border-solid custom-border rounded-full p-2 h-16 w-16 ">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${postData.id}.png`}
              className="h-12 w-12 rounded-full overflow-hidden"
            />
          </div>
          <div className="w-72 ">
            <p className="font-bold">@{postData.title.slice(0, 4)}</p>
            <p className="capitalize text-xs mt-1">{postData.body}</p>
          </div>
        </div>

        <div
          className="flex  m-3 cursor-pointer  justify-end"
          onClick={handleClick}
        >
          <motion.div
            className="custom-blue flex items-center gap-2 rounded-full p-2"
            whileHover={{ scale: 1.1 }}
          >
            <FaRegComment
              style={{
                width: "20px",
                height: "20px",
                color: "white",
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Posts;

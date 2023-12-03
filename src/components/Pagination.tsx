import React from "react";
import { motion } from "framer-motion";
const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="mt-5 ">
      <ul className="flex justify-center items-center ">
        {pageNumbers.map((number) => (
          <motion.li
            whileHover={{ scale: 1.3 }}
            key={number}
            className="m-2 w-6 h-8 flex justify-center rounded-lg hover:bg-blue-300 hover:text-slate-50 px-4 items-center border border-solid border-white custom-gray font-bold"
            onClick={() => paginate(number)}
          >
            {number}
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;

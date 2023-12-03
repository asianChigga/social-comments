import { motion } from "framer-motion";

const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
}: any) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="mt-5 ">
      <ul className="flex flex-wrap justify-center items-center ">
        {pageNumbers.map((number) => (
          <motion.li
            whileHover={{ scale: 1.3 }}
            key={number}
            className="m-1 md:m-2 w-8 h-8 md:w-10 md:h-10 flex justify-center rounded-lg hover:bg-blue-300 hover:text-slate-50 px-2 md:px-4 items-center border border-solid border-white custom-gray font-bold cursor-pointer"
            onClick={() => paginate(number)}
            style={{
              backgroundColor: number === currentPage ? "#99A9DD" : "#848884",
              fontSize: "0.9rem", // Adjust font size for smaller screens
            }}
          >
            {number}
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;

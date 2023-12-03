import React, { useEffect, useState } from "react";
import useCachedApiData from "../../hooks/useFetch";
import { uniqueNamesGenerator, names } from "unique-names-generator";
import Pagination from "../Pagination";
import Comments from "./Comments";

const Post = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const { data, isLoading } = useCachedApiData(
    "https://jsonplaceholder.typicode.com/posts"
  );
  const [modal, setModal] = useState(false);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data?.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-3 flex flex-col items-center">
      Feeds
      {currentPosts?.map((p, index) => {
        const capitalizedName = uniqueNamesGenerator({
          dictionaries: [names],
          style: "capital",
          seed: index, // Use the index as a seed for uniqueness
        });
        return (
          <div className="bg-white flex flex-col m-3 p-6 max-w-md rounded-md">
            <div className="flex items-center justify-between">
              <p className="font-bold">{capitalizedName}</p>
              {/* <button
                className="border-2 rounded-md p-2 flex text-xs"
                onClick={() => setModal(!modal)}
              >
                Comments
              </button> */}
              <Comments p={p} i={index} />
            </div>
            <div className="absolute"></div>
            <div className="mt-3">
              <h2>{p.title}</h2>
              <p>{p.body}</p>
              <span></span>
            </div>
          </div>
        );
      })}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={data?.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Post;

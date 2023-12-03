import React, { useState } from "react";
import useCachedApiData from "../hooks/useFetch";
import Posts from "./Posts";
import { useToast } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import Pagination from "./Pagination";

interface PostData {
  userId: number;
  id: number;
  title: string;
  body: string;
}
const Dashboard: React.FC = () => {
  const toast = useToast();
  const { data, isLoading, error } = useCachedApiData<PostData[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data?.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  console.log(error);
  return (
    <div className="custom-dark-blue">
      {isLoading && (
        <div className="flex justify-center min-h-screen items-center">
          <Spinner />
        </div>
      )}
      {error && (
        <div className="flex justify-center min-h-screen items-center">
          <h2 className="bg-red-400 p-3 w-52 text-center font-bold rounded-lg text-white border border-red-600 border-1">
            Error: {error.message}
          </h2>
        </div>
      )}
      {currentPosts?.map((postData) => {
        return <Posts postData={postData} />;
      })}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={data?.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Dashboard;

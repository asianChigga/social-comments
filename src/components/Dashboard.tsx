import React, { useState } from "react";
import useCachedApiData from "../hooks/useFetch";
import Posts from "./Posts";
import { Spinner } from "@chakra-ui/react";
import Pagination from "./Pagination";

const Dashboard: React.FC = () => {
  const { data, isLoading, error }: any = useCachedApiData(
    "https://jsonplaceholder.typicode.com/posts"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data?.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  console.log(error);
  if (error) {
    return (
      <div className="flex justify-center min-h-screen items-center custom-dark-blue">
        <h2 className="bg-red-400 p-3 w-52 text-center font-bold rounded-lg text-white border border-red-600 border-1">
          Error: {error.message}
        </h2>
      </div>
    );
  }
  return (
    <div className="custom-dark-blue min-h-screen ">
      {isLoading && (
        <div className="flex justify-center min-h-screen items-center">
          <Spinner />
        </div>
      )}

      {currentPosts?.map((postData: any) => {
        return <Posts postData={postData} />;
      })}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={data?.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Dashboard;

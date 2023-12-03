import { useNavigate, useParams } from "react-router-dom";
import useCachedApiData from "../hooks/useFetch";
import { useState } from "react";
import { HiChevronRight } from "react-icons/hi";
import { GoChevronLeft } from "react-icons/go";
import useCommentStore from "../hooks/useStore";
import { Spinner } from "@chakra-ui/react";
import { motion } from "framer-motion";
const CommentPage = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const { postId } = useParams();
  const [intValue, setIntValue] = useState("");
  const { data, isLoading, error } = useCachedApiData(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  const navigation = useNavigate();
  const setComment = useCommentStore((state) => state.setComment);
  const comment = useCommentStore((state) => state.comments);
  const handleClick = () => {
    if (intValue.trim() === "") {
      return;
    }

    const newComment = {
      postId: postId,
      body: intValue,
    };

    setComment(postId, newComment);
    setIntValue("");
    console.log(comment);
  };
  const handleBack = (e) => {
    e.preventDefault();
    navigation("/");
  };
  return (
    <div className="min-h-screen flex flex-col  custom-dark-blue">
      <div
        className="mt-2 w-10 custom-gray ml-8 rounded-full flex items-center justify-center h-10 hover:bg-blue-300"
        onClick={handleBack}
      >
        <GoChevronLeft
          style={{
            height: "25px",
            width: "25px",
          }}
        />
      </div>

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
      <div className="flex flex-col items-center  overflow-y-scroll custom-bar ">
        {comment[postId]?.map((storeComment) => (
          <motion.div
            animate={{ x: [100, 0] }}
            transition={{ type: "spring", stiffness: 100 }}
            key={storeComment.id}
            className="bg-gradient-to-r from-cyan-50 to-blue-100 flex w-72 mt-3 rounded-lg p-3 gap-2"
          >
            <div>
              <p className=" custom-gray rounded-full flex justify-center items-center h-7 w-7 p-3 text-xs font-semibold custom-border">
                Me
              </p>
            </div>
            <div className="">
              <h2 className="text-xs font-bold">@me</h2>
              <p className="capitalize text-xs w-60 max-w-xs pr-4">
                {storeComment.body}
              </p>
            </div>
          </motion.div>
        ))}
        {data?.map((comments) => {
          return (
            <div className="bg-gradient-to-r from-cyan-50 to-blue-100  flex justify-center w-72 mt-3 rounded-lg p-3 gap-3">
              <div>
                <p className=" custom-gray rounded-full flex justify-center items-center h-7 w-7 p-3 text-xs font-semibold custom-border capitalize">
                  {comments.name[0]}
                </p>
              </div>
              <div>
                <h2 className="text-xs font-bold">
                  @{comments.name.slice(0, 6)}
                </h2>
                <p className="capitalize text-xs ">{comments.body}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className=" flex gap-3 px-5 py-3 justify-center fixed bottom-0 w-screen bg-white">
        <input
          placeholder="Add a Comment"
          onFocus={() => setIsInputFocused(true)}
          className="p-2 outline-none flex-1 rounded-full custom-border"
          value={intValue}
          onChange={(e) => setIntValue(e.target.value)}
        ></input>
        {isInputFocused && (
          <button
            className="custom-gray rounded-full p-2  hover:bg-blue-300"
            onClick={handleClick}
          >
            <HiChevronRight
              style={{ width: "25px", height: "25px", color: "white" }}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentPage;

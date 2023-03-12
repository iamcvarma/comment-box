import React, { useContext, useState } from "react";
import CommentContext from "../store/CommentContext";

const UpvoteBox = ({ upvotes, id }) => {
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted,setIsDownvoted] = useState(false)
  const { setComments } = useContext(CommentContext);
  const handleUpvote = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_BASE_URL}/comments/${id}/${
        isUpvoted ? "downvote" : "upvote"
      }`,
      {
        method: "PATCH",
      }
    );
    const data = await res.json();
    setComments(data);
    setIsUpvoted((pre) => !pre);
  };

  const handleDownvote = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_BASE_URL}/comments/${id}/${
        isDownvoted ? "upvote" : "downvote"
      }`,
      {
        method: "PATCH",
      }
    );
    const data = await res.json();
    setComments(data);
    setIsDownvoted((pre) => !pre);
  };
  return (
    <div className="flex gap-2 ">
      <button
        className={`flex items-center rounded-lg hover:bg-orange-300 px-1 ${isUpvoted?"bg-orange-500":""}`}
        onClick={handleUpvote}
      >
        <svg
          fill="#000000"
          width="20px"
          height="20px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          transform="rotate(0)"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10zM15 12h-1v8h-4v-8H6.081L12 4.601 17.919 12H15z"></path>
          </g>
        </svg>
      </button>
      {upvotes}
      <button
      onClick={handleDownvote}
      className={`flex items-center rounded-lg hover:bg-blue-300 px-1 ${isDownvoted?"bg-blue-500":""}`}>
        <svg
          fill="#000000"
          width="20px"
          height="20px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          transform="rotate(180)"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10zM15 12h-1v8h-4v-8H6.081L12 4.601 17.919 12H15z"></path>
          </g>
        </svg>
      </button>
    </div>
  );
};

export default UpvoteBox;

import React, { useState, useEffect } from "react";
import CommentBox from "./CommentBox";
import ReplyBox from "./ReplyBox";
import CommentContext from "../store/CommentContext";

const CommentContainer = () => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const getAllComments = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/comments`
      );
      const data = await res.json();
      setComments(data);
    };
    getAllComments();
  }, []);
  return (
    <CommentContext.Provider value={{ setComments }}>
      <div className="w-full flex flex-col items-center">
        <h1 className="text-xl">Comment Section</h1>
        <div className="w-full"> 
          {comments.map((comment) => (
            <CommentBox {...comment} key={comment._id} />
          ))}
        </div>
        <div className="w-full">

        <ReplyBox  />
        </div>
      </div>
    </CommentContext.Provider>
  );
};

export default CommentContainer;

import React, { useState, useContext, useEffect } from "react";
import CommentContext from "../store/CommentContext";
import UserContext from "../store/UserContext";
const ReplyBox = ({
  parentId = "",
  onSumbit,
  content = "",
  isEdit = false,
}) => {
  const [text, setText] = useState(content);
  const { user } = useContext(UserContext);
  const { setComments } = useContext(CommentContext);

  const handleSubmit = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_BASE_URL}/comments/${parentId}`,
      {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          content: text,
        }),
      }
    );
    const data = await res.json();
    setComments(data);
    setText("");
    if (onSumbit) onSumbit();
  };
  return (
    <div className="flex flex-col max-w-[35rem]  m-2 ">
      <div className="relative flex items-center">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="block w-full py-2 px-3 rounded-md border border-gray-300 placeholder-gray-500 text-gray-900  bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows="3"
          placeholder={
            user ? "Write your reply here..." : "Please log in to reply"
          }
          disabled={user ? false : true}
        />
      </div>

      <div className="flex justify-end">
        <button
        className="mt-2"
          onClick={handleSubmit}
          disabled={user ? false : true}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ReplyBox;

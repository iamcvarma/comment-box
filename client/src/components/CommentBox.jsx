import React, { useEffect, useState, useContext } from "react";
import UserContext from "../store/UserContext";
import ReplyBox from "./ReplyBox";

const CommentBox = ({ _id, userId, content, upvotes, replies }) => {
  const [userName, setUserName] = useState("");
  const [userPicture, setUserPicture] = useState("");
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [showEditBox, setShowEditBox] = useState(false);
  const { user } = useContext(UserContext);
  useEffect(() => {
    const getUserData = async (userID) => {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/users/${userID}`
      );
      const data = await res.json();
      setUserPicture(data.profileURL);
      setUserName(data.name);
    };
    getUserData(userId);
  }, []);
  return (
    <div className="w-full flex flex-col ml-6">
      <div className="flex flex-row">
        <div>
          <img src={userPicture} alt={userName} width={20} height={20} />
        </div>
        <div className="flex flex-col">
          <div className="border-2  border-black p-2 flex flex-col">
            <h2>{userName}</h2>
            <div>
              <p>{content}</p>
            </div>
          </div>
          <div className="flex flex-row">
            <button>upvote {upvotes}</button>
            <button onClick={() => setShowReplyBox((pre) => !pre)}>
              reply
            </button>
            {user?._id === userId && (
              <button onClick={() => setShowEditBox((pre) => !pre)}>
                Edit
              </button>
            )}
          </div>
          {showReplyBox && (
            <ReplyBox parentId={_id} onSumbit={() => setShowReplyBox(false)} />
          )}
          {showEditBox && (
            <ReplyBox
              parentId={_id}
              onSumbit={() => setShowEditBox(false)}
              content={content}
              isEdit={true}
            />
          )}
        </div>
      </div>
      {replies.map((comment) => (
        <CommentBox {...comment} />
      ))}
    </div>
  );
};

export default CommentBox;

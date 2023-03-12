import React, { useEffect, useState, useContext } from "react";
import UserContext from "../store/UserContext";
import ReplyBox from "./ReplyBox";
import UpvoteBox from "./UpvoteBox";  
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
    <div className="max-w-full flex flex-col ml-7 box-border">
      <div className="flex flex-row max-w-full ">
        <div className="p-1">
          <img
            src={userPicture}
            alt={userName}
            className="w-[40px] h-[40px] rounded-full"
          />
        </div>
        <div className="flex flex-col w-full">
          <div className="border-2 border-black/30  flex flex-col rounded-lg">
            <h2 className="font-semibold pt-2 pl-2">{userName}</h2>
            <div className="p-2 pl-4">
              <p>{content}</p>
            </div>
          </div>
          <div className="flex flex-row gap-2 p-2">
            <UpvoteBox upvotes={upvotes} id={_id}/>
            <button onClick={() => setShowReplyBox((pre) => !pre)} className="bg-slate-100 p-1 hover:bg-slate-200 rounded-lg">
            
              <span>Reply</span>
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
        <CommentBox {...comment} key = {comment._id}/>
      ))}
    </div>
  );
};

export default CommentBox;

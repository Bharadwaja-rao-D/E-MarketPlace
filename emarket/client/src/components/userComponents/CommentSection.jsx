import React, { useState } from "react";
import "../../styles/commentSection.css";

function CommentCard({ index, comment }) {
  return (
    <div className="comment">
      <p>{comment.username}</p>
      <p>{comment.comment}</p>
    </div>
  );
}

export default function CommentSection({ comment_list }) {
  console.log(comment_list);
  const [comment, setComment] = useState("");
  const handleInputChange = (event) => {
    setComment(event.target.value);
  };

  const handleComment = () => {
    //  Need an api call here
    // Better to send only comment here and get the user id via JWT

    console.log(comment);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleComment();
    }
  };
  return (
    <div className="commentsection">
      <div className="comments">
        {comment_list.map((comment, idx) => {
          return <CommentCard key={idx} buyer={comment} />;
        })}
      </div>
      <div className="new-comment">
        <input
          type="text"
          onKeyDown={handleKeyPress}
          onChange={handleInputChange}
        ></input>
        <i className="fa fa-paper-plane" onClick={handleComment}></i>
      </div>
    </div>
  );
}

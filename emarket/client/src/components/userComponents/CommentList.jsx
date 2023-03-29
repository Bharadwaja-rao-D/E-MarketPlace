import React from "react";
import "../../styles/commentList.css";

function CommentCard({ index, comment }) {
  return (
    <div className="comment-card">
      <p>{comment.username}</p>
      <p>{comment.comment}</p>
    </div>
  );
}

export default function CommentList({ comment_list }) {
  console.log(comment_list);
  return (
    <div className="comment-list">
      {comment_list.map((comment, idx) => {
        return <CommentCard key={idx} buyer={comment} />;
      })}
    </div>
  );
}

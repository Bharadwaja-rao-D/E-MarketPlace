import React, { useState, useEffect } from "react";
import "../../styles/commentSection.css";
import useAxiosInstance from "../../utils/useAxios";

function CommentCard({ index, comment }) {
  const username = JSON.parse(sessionStorage.getItem("profile")).name;
  const name = comment.commentor === username ? "You" : comment.commentor;
  return (
    <div className="comment">
      <p className="commentor">
        <i className="fa fa-user"> </i>
        {name}
      </p>
      <p className="comment-text">{comment.comment}</p>
    </div>
  );
}

export default function CommentSection({ id }) {
  const [comment, setComment] = useState("");
  const api = useAxiosInstance();
  const [comment_list, setComment_list] = useState([]);

  useEffect(() => {
    async function fetchComments() {
      try {
        const url = "comments/" + id;
        const response = await api.get(url);
        setComment_list(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchComments();
  }, []);

  const handleInputChange = (event) => {
    setComment(event.target.value);
  };

  const handleComment = async () => {
    try {
      const url = "/comments/" + id;
      const response = await api.post(url, { comment: comment });
      console.log(response);
      setComment("");
      try {
        const url = "comments/" + id;
        const response = await api.get(url);
        setComment_list(response.data);
      } catch (error) {
        console.error(error);
      }
    } catch (e) {
      console.log(e);
    }

    console.log(comment);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleComment();
    }
  };
  return (
    <div className="commentsection">
      <h3>
        Comment Section <i className="fa fa-comment"></i>
      </h3>
      <div className="comments">
        {comment_list.map((comment, idx) => {
          return <CommentCard key={idx} comment={comment} />;
        })}
      </div>
      <div className="new-comment">
        <input
          type="text"
          onKeyDown={handleKeyPress}
          onChange={handleInputChange}
          value={comment}
          placeholder="New Comment"
        ></input>
        <i className="fa fa-paper-plane" onClick={handleComment}></i>
      </div>
    </div>
  );
}

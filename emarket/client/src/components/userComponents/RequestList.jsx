import React from "react";
import "../../styles/requestList.css";
import useAxiosInstance from "../../utils/useAxios";
import { useLocation } from "react-router-dom";

function RequestCard({ index, buyer }) {
  const location = useLocation();
  const path = location.pathname.split("/");
  const id = path[path.length - 1];
  const data = buyer.buyer;
  const url = "products/seller/interested/" + id + "/";
  const api = useAxiosInstance();
  const handleResponse = async (val) => {
    if (val == 1) {
      const post_data = {
        buyer_id: data.id,
        accept: true,
      };
      const response = await api.post(url, post_data);
      console.log(response);
    } else {
      const post_data = {
        buyer_id: data.id,
        accept: false,
      };
      const response = await api.post(url, post_data);
      console.log(response);
    }
  };
  return (
    <div className="req-card">
      <p>
        A user {data.username} email: {data.email} contact: {data.contact + " "}
        has requested for your contact Info
      </p>
      <div className="choices">
        <button className="accept" onClick={() => handleResponse(1)}>
          <i className="fa fa-check" aria-hidden="true"></i>
        </button>
        <button className="reject" onClick={() => handleResponse(0)}>
          <i className="fa fa-close" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
}

export default function RequestList({ interested_peeps }) {
  console.log(interested_peeps);
  return (
    <div className="request-list">
      {interested_peeps.map((user, idx) => {
        return <RequestCard key={idx} buyer={user} />;
      })}
    </div>
  );
}

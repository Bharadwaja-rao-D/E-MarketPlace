import React, { useState } from "react";
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
  const [accept, setAccept] = useState(buyer.accept);
  const handleResponse = async (val) => {
    if (val == 1) {
      const post_data = {
        buyer_id: data.id,
        accept: true,
      };
      const response = await api.post(url, post_data);
      console.log(response);
      setAccept(true);
    } else {
      const post_data = {
        buyer_id: data.id,
        accept: false,
      };
      const response = await api.post(url, post_data);
      console.log(response);
      setAccept(false);
    }
  };
  return (
    <div className="req-card">
      <p>
        A user {data.username} email: {data.email} contact: {data.contact + " "}
        has requested for your contact Info
      </p>

      {!accept ? (
        <div className="choices">
          <button className="accept" onClick={() => handleResponse(1)}>
            <i className="fa fa-check" aria-hidden="true"></i>
          </button>
          <button className="reject" onClick={() => handleResponse(0)}>
            <i className="fa fa-close" aria-hidden="true"></i>
          </button>
        </div>
      ) : (
        <div className="choices">
          <button className="accept" onClick={() => handleResponse(1)}>
            Accepted
          </button>
          <button className="reject" onClick={() => handleResponse(0)}>
            <i className="fa fa-close" aria-hidden="true"></i>
          </button>
        </div>
      )}
    </div>
  );
}

export default function RequestList({ interested_peeps }) {
  return (
    <div className="request-list">
      {interested_peeps.map((user, idx) => {
        return <RequestCard key={idx} buyer={user} />;
      })}
    </div>
  );
}

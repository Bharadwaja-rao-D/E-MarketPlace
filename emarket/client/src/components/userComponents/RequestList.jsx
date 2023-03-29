import React from "react";
import "../../styles/requestList.css";

function RequestCard({ index, buyer }) {
  const data = buyer.buyer;
  return (
    <div className="req-card">
      <p>
        A user {data.username} email: {data.email} contact: {data.contact + " "}
        has requested for your contact Info
      </p>
      <div className="choices">
        <button className="accept">
          <i className="fa fa-check" aria-hidden="true"></i>
        </button>
        <button className="reject">
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

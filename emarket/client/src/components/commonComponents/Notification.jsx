import React from "react";
import "../../styles/notification.css";

export default function Notification({ count }) {
  return (
    <div className="notification-badge">
      {count > 0 && <span className="badge">{count}</span>}
    </div>
  );
}

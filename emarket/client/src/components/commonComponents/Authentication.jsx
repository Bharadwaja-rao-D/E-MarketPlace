import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Authentication() {
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const profile = sessionStorage.getItem("profile");

  useEffect(() => {
    if (profile === null) {
      if (location === "/signin" || location === "/signup") {
      } else {
        navigate("/signin");
      }
    }
  });

  return <></>;
}

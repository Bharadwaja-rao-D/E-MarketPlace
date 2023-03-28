import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import "../../styles/navbar.css";

function NavBar() {
  // This is not a good way for rendering
  // Hiding the nav bar in signin and signup pages
  const location = useLocation().pathname;
  const [showall, setshowall] = useState(true);
  if (location === "/signin" || location === "/signup") {
    return <div></div>;
  }
  // better to chnage this
  const profile = localStorage.getItem("profile");
  const img_url = profile ? JSON.parse(profile).picture : "";
  return (
    <div className="navbar">
      <div className="logo">
        <a href="\">
          <img
            src="https://seeklogo.com/images/A/apple-logo-E3DBF3AE34-seeklogo.com.png"
            alt=""
          />
          <p className="name">IITH EMP</p>
        </a>
      </div>
      <ul className={showall ? "navitems" : " navitems mobile-navitems"}>
        <li className="item">
          <a href="/">Home</a>
        </li>
        <li className="item">
          <a href="/myproducts">My Products</a>
        </li>
        <li className="item">
          <a href="/soldproducts">Sold Products</a>
        </li>
      </ul>
      <div className="hamburger">
        <a href="#" onClick={() => setshowall(!showall)}>
          <i class="fa-solid fa-bars"></i>
        </a>
      </div>
      <div className="right">
        <div className="cart">
          <a href="\cart">
            <i class="fa-solid fa-shopping-cart"></i>
          </a>
        </div>
        <a className="profileimg" href="\profile">
          <img
            // src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            src={img_url}
            alt="profile-img"
          />
        </a>
      </div>
    </div>
  );
}

export default NavBar;

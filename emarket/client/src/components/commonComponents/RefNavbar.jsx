import React, { useState } from "react";
import "../../styles/refnavbar.css";

import { NavLink } from "react-router-dom";

const RefNavBar = () => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  return (
    <>
      <nav className="main-nav">
        {/* 1st logo part  */}
        <div className="logo">
          <h2>
            <span>IITH EMP</span>
          </h2>
        </div>

        {/* 2nd menu part  */}
        <div
          className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }
        >
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/myproducts">My Products</NavLink>
            </li>
            <li>
              <NavLink to="/soldproducts">Sold Products</NavLink>
            </li>
            <li>
              <NavLink to="/cart">Cart</NavLink>
            </li>
          </ul>
        </div>

        {/* 3rd social media links */}
        <div className="hamburger">
          {/* hamburget menu start  */}
          <div className="hamburger-menu">
            <a href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
              bar
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default RefNavBar;

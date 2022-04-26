import React from "react";
import { Link } from "react-router-dom";
import "./header.css";
import {
  BiList,
  BiPersonCircle,
  IcBaselineLogout,
} from "assets/icons/Icons.jsx";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "context/SidebarContext";

function Header() {
  const { setShowSidebar } = useSidebar();
  return (
    <header className="header">
      <nav className="navigation d-flex">
        <div className="nav-section d-flex align-center">
          <button className="btn btn-secondary d-none mobile-view hamburger">
            <BiList
              className="fs-m"
              onClick={() => setShowSidebar((prev) => !prev)}
            />
          </button>
          <Link to="/">
            <p className="nav-brand-link mr-sm">
              {" "}
              JODD<span className="brand-text">Tube</span>
            </p>
          </Link>
        </div>

        <div className="nav-section login">
          <Link to="/signin">
            <BiPersonCircle className="fs-ml nav-link" />
          </Link>
        </div>
      </nav>
    </header>
  );
}

export { Header };

import React, { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./header.css";
import {
  BiList,
  BiPersonCircle,
  IcBaselineLogout,
} from "assets/icons/Icons.jsx";
import { useAuth, useSidebar, useVideos } from "context";
import { BiSearch } from "assets/icons/Icons";

function Header() {
  const { setShowSidebar } = useSidebar();
  const {
    authState: { encodedToken },
    logoutHandler,
  } = useAuth();
  const timerId = useRef(null);
  const [searchData, setSearchData] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const { videoDispatch } = useVideos();

  const setSearch = () => {
    videoDispatch({ type: "SET_SEARCH", payload: { searchData } });
  };

  const debounce = function (callback, delay = 500) {
    return function () {
      clearTimeout(timerId.current);
      timerId.current = setTimeout(() => callback(), delay);
    };
  };

  const debouncingMethod = debounce(setSearch, 500);

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

        <div className="search">
          <input
            type="text"
            placeholder="Search for videos"
            className="form-input"
            value={searchData}
            onChange={(e) => {
              location.pathname !== "/" && navigate("/");
              setSearchData(() => e.target.value);
            }}
            onKeyUp={() => debouncingMethod()}
          />
          <BiSearch className="search-icon" />
        </div>

        <div className="nav-section login">
          {encodedToken ? (
            <Link to="/">
              <IcBaselineLogout
                onClick={logoutHandler}
                className="fs-ml nav-link"
              />
            </Link>
          ) : (
            <Link to="/signin">
              <BiPersonCircle className="fs-ml nav-link" />
            </Link>
          )}
        </div>
      </nav>
      <div className="search-responsive">
        <input
          type="text"
          placeholder="Search for videos"
          className="form-input"
        />
        <BiSearch className="search-icon-responsive" />
      </div>
    </header>
  );
}

export { Header };

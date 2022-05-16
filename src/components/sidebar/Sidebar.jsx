import "./sidebar.css";
import {
  BiHouseDoor,
  BiClockHistory,
  PhClock,
  BiHeart,
  BiPlaylist,
} from "assets/icons/Icons";
import { NavLink } from "react-router-dom";
import { useSidebar } from "context";

const navbarData = [
  { link: "/", icon: BiHouseDoor, text: "Home", class: "fs-s" },
  { link: "/watchlater", icon: PhClock, text: "WatchLater", class: "fs-m" },
  { link: "/playlist", icon: BiPlaylist, text: "PlayList", class: "fs-s" },
  { link: "/history", icon: BiClockHistory, text: "History", class: "fs-s" },
  { link: "/liked", icon: BiHeart, text: "Liked", class: "fs-s" },
];

function Sidebar() {
  const { showSidebar } = useSidebar();
  return (
    <aside
      className={`sidebar ${
        showSidebar ? "sidebar-responsive-show" : "sidebar-responsive-hide"
      }`}
    >
      <ul className="sidebar-list
      ">
        {navbarData.map((data, index) => {
          return (
            <li key={index}>
              <NavLink
                to={data.link}
                className={`${({ isActive }) =>
                  isActive ? "active" : ""} sidebar-item`}
              >
                {" "}
                <data.icon className={data.class} />
                <span className="fs-s">{data.text}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export { Sidebar };

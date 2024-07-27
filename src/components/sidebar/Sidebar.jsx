import "./sidebar.css";
import LineStyle from '@mui/icons-material/LineStyle';
import PermIdentity from '@mui/icons-material/PermIdentity';
import PlayCircleOutline from '@mui/icons-material/PlayCircleOutline';
import List from '@mui/icons-material/List';
import AddToQueue from '@mui/icons-material/AddToQueue';
import QueuePlayNext from '@mui/icons-material/QueuePlayNext';

import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className={`sidebarListItem ${location.pathname === "/" ? "active" : ""}`}>
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className={`sidebarListItem ${location.pathname === "/users" ? "active" : ""}`}>
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/movies" className="link">
              <li className={`sidebarListItem ${location.pathname === "/movies" ? "active" : ""}`}>
                <PlayCircleOutline className="sidebarIcon" />
                Movies
              </li>
            </Link>
            <Link to="/lists" className="link">
              <li className={`sidebarListItem ${location.pathname === "/lists" ? "active" : ""}`}>
                <List className="sidebarIcon" />
                Lists
              </li>
            </Link>
            <Link to="/newMovie" className="link">
              <li className={`sidebarListItem ${location.pathname === "/newMovie" ? "active" : ""}`}>
                <AddToQueue className="sidebarIcon" />
                Add Movie
              </li>
            </Link>
            <Link to="/newList" className="link">
              <li className={`sidebarListItem ${location.pathname === "/newList" ? "active" : ""}`}>
                <QueuePlayNext className="sidebarIcon" />
                Add List
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

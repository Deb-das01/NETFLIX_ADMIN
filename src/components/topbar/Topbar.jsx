import React from "react";
import "./topbar.css";
import NotificationsNone from '@mui/icons-material/NotificationsNone';
import Language from '@mui/icons-material/Language';


export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">ADMIN PANEL</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
        </div>
      </div>
    </div>
  );
}

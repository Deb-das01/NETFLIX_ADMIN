import "./widgetSm.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function WidgetSm() {
  const [newUsers, setNewUsers] = useState([]);

  useEffect(() => {
    const getNewUsers = async () => {
      try {
        //The request is being made to the API we created to fetch the user details those who are new
        const res = await axios.get("https://netflix-mern-backend.onrender.com/api/users?new=true", {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setNewUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getNewUsers();
  }, []);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
      {/* The below map is used so that each user should get a seperate component in a  list form */}
      {newUsers.map((user) => (
        <li key={user._id} className="widgetSmListItem">
        <img
        // below line defines that if the user's propic dosent exist then use this default image
          src={
            user.profilePic ||
            "https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg"
          }
          alt=""
          className="widgetSmImg"
        />
        <div className="widgetSmUser">
          <span className="widgetSmUsername">{user.username}</span>
        </div>
        <button className="widgetSmButton">
          {user.email}
        </button>
      </li>
      ))}
      </ul>
    </div>
  );
}

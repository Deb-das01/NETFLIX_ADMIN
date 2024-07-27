import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./userEdit.css";

export default function UserEdit() {
  const [user, setUser] = useState({});
  const { userId } = useParams(); // Ensure it matches the route parameter
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`/users/find/${userId}`, {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser({ ...user, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/users/${userId}`, user, {
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      navigate("/users");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="userEdit">
      <h1>Edit User</h1>
      <form className="userEditForm" onSubmit={handleSubmit}>
        <div className="userEditItem">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={user.username || ""}
            onChange={handleChange}
          />
        </div>
        <div className="userEditItem">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={user.email || ""}
            onChange={handleChange}
          />
        </div>
        <div className="userEditItem">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={user.password || ""}
            onChange={handleChange}
          />
        </div>
        <div className="userEditItem">
          <label>Admin</label>
          <input
            type="checkbox"
            name="isAdmin"
            checked={user.isAdmin || false}
            onChange={handleChange}
          />
        </div>
        <button className="userEditButton" type="submit">Update</button>
      </form>
    </div>
  );
}

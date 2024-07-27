// src/pages/movieEdit/MovieEdit.jsx

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./movieEdit.css";

export default function MovieEdit() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [year, setYear] = useState("");
  const [limit, setLimit] = useState("");
  const [genre, setGenre] = useState("");
  const [isSeries, setIsSeries] = useState(false);
  const [message, setMessage] = useState(""); // State for success message
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`https://netflix-mern-backend.onrender.com/api/movies/find/${id}`, {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setTitle(res.data.title);
        setDesc(res.data.desc);
        setImg(res.data.img);
        setYear(res.data.year);
        setLimit(res.data.limit);
        setGenre(res.data.genre);
        setIsSeries(res.data.isSeries);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMovie();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(`https://netflix-mern-backend.onrender.com/api/movies/${id}`, {
        title,
        desc,
        img,
        year,
        limit,
        genre,
        isSeries,
      }, {
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      setMessage("Movie updated successfully!"); // Set success message
    } catch (err) {
      console.log(err);
      setMessage("Failed to update movie."); // Set failure message
    }
  };

  return (
    <div className="movieEdit">
      <h1>Edit Movie</h1>
      <form className="movieEditForm">
        <div className="movieEditItem">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="movieEditItem">
          <label>Description</label>
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="movieEditItem">
          <label>Image URL</label>
          <input
            type="text"
            value={img}
            onChange={(e) => setImg(e.target.value)}
          />
        </div>
        <div className="movieEditItem">
          <label>Year</label>
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <div className="movieEditItem">
          <label>Limit</label>
          <input
            type="number"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
          />
        </div>
        <div className="movieEditItem">
          <label>Genre</label>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>
        <div className="movieEditItem">
          <label>Is Series?</label>
          <input
            type="checkbox"
            checked={isSeries}
            onChange={(e) => setIsSeries(e.target.checked)}
          />
        </div>
        <button
          type="button"
          onClick={() => {
            handleUpdate();
            // Navigate to /movies after a short delay to show the success message
            setTimeout(() => navigate("/movies"), 3000);
          }}
        >
          Update Movie
        </button>
      </form>
      {message && <div className="successMessage">{message}</div>}
    </div>
  );
}

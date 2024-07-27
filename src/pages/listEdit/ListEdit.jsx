import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./listEdit.css";

export default function ListEdit() {
  const [list, setList] = useState({});
  const [allMovies, setAllMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState("");
  const [movieIdToRemove, setMovieIdToRemove] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await axios.get(`https://netflix-mern-backend.onrender.com/api/lists/${id}`, {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setList(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchAllMovies = async () => {
      try {
        const res = await axios.get('https://netflix-mern-backend.onrender.com/api/movies', {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setAllMovies(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchList();
    fetchAllMovies();
  }, [id]);

  const handleAddMovie = async () => {
    try {
      await axios.put(`https://netflix-mern-backend.onrender.com/api/lists/${id}/add`, { movieId: selectedMovieId }, {
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      // Refresh list data or provide user feedback
      const res = await axios.get(`https://netflix-mern-backend.onrender.com/api/lists/${id}`, {
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      setList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveMovie = async () => {
    try {
      await axios.put(`https://netflix-mern-backend.onrender.com/api/lists/${id}/remove`, { movieId: movieIdToRemove }, {
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      // Refresh list data or provide user feedback
      const res = await axios.get(`https://netflix-mern-backend.onrender.com/api/lists/${id}`, {
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      setList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const availableMovies = allMovies.filter(movie => !list.content.includes(movie._id));
  const moviesInList = allMovies.filter(movie => list.content.includes(movie._id));

  return (
    <div className="listEdit">
      <h1>Edit List</h1>
      <form className="listEditForm">
        <div className="listEditItem">
          <label>Title</label>
          <input
            type="text"
            value={list.title}
            readOnly
          />
        </div>
        <div className="listEditItem">
          <label>Movies to Add</label>
          <select onChange={(e) => setSelectedMovieId(e.target.value)}>
            <option value="">Select a movie to add</option>
            {availableMovies.map(movie => (
              <option key={movie._id} value={movie._id}>{movie.title}</option>
            ))}
          </select>
          <button type="button" onClick={handleAddMovie}>Add Movie</button>
        </div>
        <div className="listEditItem">
          <label>Movies in List</label>
          <select onChange={(e) => setMovieIdToRemove(e.target.value)}>
            <option value="">Select a movie to remove</option>
            {moviesInList.map(movie => (
              <option key={movie._id} value={movie._id}>{movie.title}</option>
            ))}
          </select>
          <button type="button" onClick={handleRemoveMovie}>Remove Movie</button>
        </div>
      </form>
    </div>
  );
}

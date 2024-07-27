import React, { useContext } from 'react';
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import Login from "./pages/login/Login";
import { AuthContext } from "./context/authContext/AuthContext";
import ListList from "./pages/listList/ListList";
import List from "./pages/list/List";
import NewList from "./pages/newList/NewList";
import MovieList from "./pages/MovieList/MovieList";
import NewMovie from "./pages/newMovie/NewMovie";
import Movie from '@mui/icons-material/Movie';

import UserEdit from './pages/userEdit/UserEdit';
import ListEdit from './pages/listEdit/ListEdit';
import MovieEdit from './pages/movieEdit/MovieEdit';
function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} /> 
          {user && (
            <React.Fragment>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/user/edit/:userId" element={<UserEdit/>}/>
              <Route path="/user/:userId" element={<User />} />
              <Route path="/newUser" element={<NewUser />} />
              <Route path="/movies" element={<MovieList />} />
              <Route path="/movie/edit/:id" element={<MovieEdit/>}/>
              <Route path="/movie/:movieId" element={<Movie />} />
              <Route path="/newMovie" element={<NewMovie />} />
              <Route path="/lists" element={<ListList />} />
              <Route path="/list/edit/:id" element={<ListEdit />} />
              <Route path="/list/:listId" element={<List />} />
              <Route path="/newlist" element={<NewList />} />
            </React.Fragment>
          )}
          {/* Redirect to login if user is not authenticated */}
          {!user && <Route path="*" element={<Navigate to="/login" />} />} 
        </Routes>
      </div>
    </Router>
  );
}

export default App;

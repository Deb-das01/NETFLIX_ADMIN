import axios from "axios";

export const getUsers = async (dispatch) => {
  dispatch({ type: "GET_USERS_START" });
  try {
    const res = await axios.get("/users", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch({ type: "GET_USERS_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "GET_USERS_FAILURE" });
  }
};

export const deleteUser = async (id, dispatch) => {
  try {
    await axios.delete(`/users/${id}`, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch({ type: "DELETE_USER", payload: id });
  } catch (err) {
    console.log(err);
  }
};

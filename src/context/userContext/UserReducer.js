const UserReducer = (state, action) => {
    switch (action.type) {
      case "GET_USERS_START":
        return {
          users: [],
          isFetching: true,
          error: false,
        };
      case "GET_USERS_SUCCESS":
        return {
          users: action.payload,
          isFetching: false,
          error: false,
        };
      case "GET_USERS_FAILURE":
        return {
          users: [],
          isFetching: false,
          error: true,
        };
      case "DELETE_USER":
        return {
          users: state.users.filter((user) => user._id !== action.payload),
          isFetching: false,
          error: false,
        };
      default:
        return state;
    }
  };
  
  export default UserReducer;
  
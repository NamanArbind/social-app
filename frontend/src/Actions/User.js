import axios from "axios";

export const loginUser = (email,password) => async (dispatch) => {
  //Higher order function

  try {
    dispatch({
      type: "LoginRequest",
    });
    const { data } = await axios.post(
      "/api/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "LoginSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoginFailure",
      payload: error.message,
    });
  }
};
export const loadUser = () => async (dispatch) => {
  //Higher order function

  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const { data } = await axios.get("/api/me");

    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFailure",
      payload: error.message,
    });
  }
};

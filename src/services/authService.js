import axios from "axios";

const API_URL =
`${import.meta.env.VITE_API_URL}/api/auth`;

export const signupUser = async (userData) => {
  const response = await axios.post(
    `${API_URL}/signup`,
    userData
  );

  return response.data;
};

export const loginUser = async (userData) => {

  const response = await axios.post(
    `${API_URL}/login`,
    userData
  );

  localStorage.setItem(
    "token",
    response.data.token
  );

  localStorage.setItem(
    "user",
    JSON.stringify(
      response.data.user
    )
  );

  return response.data;
};
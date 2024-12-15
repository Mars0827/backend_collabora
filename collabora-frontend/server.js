import axios from "axios";

const API_BASE_URL = "https://localhost:5067"; // Your backend base URL

export const register = async (registerData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, registerData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // Handle the success response
  } catch (error) {
    throw error.response.data; // Handle errors
  }
};

export const login = async (loginData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, loginData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // Success response (e.g., accessToken)
  } catch (error) {
    throw error.response.data; // Error response
  }
};

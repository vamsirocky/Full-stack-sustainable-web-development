import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Your backend server

// Signup API
export const signup = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, data);
    return response.data;
  } catch (error) {
    console.error("Error during signup:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Login API
export const login = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, data);
    return response.data;
  } catch (error) {
    console.error("Error during login:", error.response ? error.response.data : error.message);
    throw error;
  }
};

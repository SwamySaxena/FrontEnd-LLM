import axios from 'axios';

const API_URL = 'http://localhost:5000/api';  // Replace with your Flask backend URL

// Function to handle user registration
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;  // Correctly return the data if the request is successful
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);  // Use error message from the server if available
    } else {
      throw new Error('An unknown error occurred.');  // Handle unknown errors
    }
  }
};

// Function to handle user login
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('An unknown error occurred.');
    }
  }
};

// Function to fetch the user's last conversation
export const getConversation = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/conversation`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('An unknown error occurred.');
    }
  }
};

// Function to save a new conversation
export const saveConversation = async (token, conversationData) => {
  try {
    const response = await axios.post(`${API_URL}/conversation`, conversationData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('An unknown error occurred.');
    }
  }
};

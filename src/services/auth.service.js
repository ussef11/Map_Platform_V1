import axios from "axios";


const host = process.env.REACT_APP_API; 
const API_URL = host;
const register = (username, email, password) => {
  return axios.post(API_URL + "api/auth/signup", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "api/auth/signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const forgotpaass = (username, password, newpassword) => {
  return axios
    .post(API_URL + "api/auth/ForgetPassword", {
      username,
      password,
      newpassword,
    })
    .then((response) => {
      if (response.data.accessToken) {
        window.location.reload();
      }
    });
};

const logout = () => {
  localStorage.removeItem("user");
  
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  forgotpaass
};

export default AuthService;

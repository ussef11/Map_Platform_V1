import axios from "axios";
import authHeader from "./auth.header";
import AuthService from "./auth.service";

const host = process.env.REACT_APP_API;
const API_URL = host;

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "api/user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "api/mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "api/admin", { headers: authHeader() });
};

const currentuser = AuthService.getCurrentUser();

const getalluser = () => {
  return axios.get(API_URL + "getalluser", { headers: authHeader() });
};



const updateUser = (id, username, email, name, latitude,longitude, gsm, roles) => {
  return axios.post(API_URL + "api/admin/UpdatedUser", {
    id,
    username,
    email,
    name,
    latitude,
    longitude,
    gsm,
    roles,
  },{ headers:authHeader()});
};

const deteleUser = (id)=>{
  return axios.post(API_URL + "api/admin/DeleteUser" , {
    id
  },{ headers:authHeader()})
}

const AddArticles = (title, content) => {
  if (currentuser) {
    console.log(currentuser.id);

    return axios.post(
      API_URL + "Add",
      {
        title,
        content,
        userId: currentuser.id,
      },
      {
        headers: authHeader(),
      }
    );
  } else {
    console.log(currentuser, "currentuser");
  }
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  AddArticles,
  getalluser,
  updateUser,
  deteleUser
};

export default UserService;

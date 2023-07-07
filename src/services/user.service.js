import axios from "axios";
import authHeader from "./auth.header";
import AuthService from "./auth.service";
const API_URL = "http://localhost:8080/";

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

const currentuser = AuthService.getCurrentUser()

const AddArticles = (title , content) =>{
  if(currentuser){
 console.log(currentuser.id)

  return axios.post(API_URL + "Add", {
    title,
    content,
    userId: currentuser.id
  }, {
    headers: authHeader()
  });

}else{
   console.log(currentuser ,"currentuser")
}
  }
 

const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  AddArticles
};

export default UserService;
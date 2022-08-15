import { Router } from "express";
import { getProjects } from "../controllers/Projects.js";
import { checkUser, getProject, getUsers, insertUser, LoginUser, logoutUser} from "../controllers/Users.js";
import { VerifyToken } from "../middleware/verifyToken.js";

const router = Router();

router.get("/", getUsers);
router.post("/", insertUser);
router.post("/login", LoginUser);
router.get("/check", VerifyToken,checkUser);
router.get("/logout", logoutUser);
router.get('/project/:userId', getProject)




export default router;








// displayUsersInfomation = () =>{

  // }

  // public getProjects = async () => {
  //   const user_project_header = document.querySelector(
  //     "#project-header"
  //   ) as HTMLDivElement;
  //   try {
  //     const userId = localStorage.getItem("userId");
  //     console.log(userId);

  //     await fetch(`http://127.0.0.1:5003/users/project/${userId}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         displayUserProject.innerHTML = UserTaskRendering(data);
  //       });
  //   } catch (error) {}
  // };
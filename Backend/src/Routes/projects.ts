import { Router } from "express";
import { deleteProject, getProjects, getSingleProject, insertProject, updateProject } from "../controllers/Projects.js";

const projectRouter = Router()


projectRouter.get("/", getProjects);
projectRouter.get("/singleproject/:id", getSingleProject);
projectRouter.post("/", insertProject); 
projectRouter.put("/update/:id", updateProject);
projectRouter.get("/:id", deleteProject);

export default projectRouter;
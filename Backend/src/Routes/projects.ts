import { Router } from "express";
import { getProjects, insertProject } from "../controllers/Projects";

const projectRouter = Router()


projectRouter.get("/", getProjects);
projectRouter.post("/", insertProject);

export default projectRouter;
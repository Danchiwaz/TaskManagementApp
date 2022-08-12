import { Router } from "express";
import { checkUser, getUsers, insertUser, LoginUser, logoutUser} from "../controllers/Users.js";
import { VerifyToken } from "../middleware/verifyToken.js";

const router = Router();

router.get("/", getUsers);
router.post("/", insertUser);
router.post("/login", LoginUser);
router.get("/check", VerifyToken,checkUser);
router.get("/logout", logoutUser);




export default router;

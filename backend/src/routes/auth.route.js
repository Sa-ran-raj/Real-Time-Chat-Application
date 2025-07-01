import express from "express";
import { login, logut, signin } from "../controllers/auth.controllers.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { updateProfile } from "../controllers/auth.controllers.js";
import { checkAuth } from "../controllers/auth.controllers.js";


const router =express.Router();

router.post("/signin",signin)

router.post("/login",login)

router.post("/logut",logut)

router.put("/update-profile",protectRoute,updateProfile);

router.get("/check",protectRoute,checkAuth);

export default router;
import express from "express";
import {
  discoverUser,
  followUser,
  getUserData,
  unfollowUser,
  updatUserData,
} from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.js";

import { upload } from "../config/multer.js";

const userRouter = express.Router();

userRouter.get("/data", protect, getUserData);
userRouter.post("/update", protect, updatUserData);
userRouter.post(
  "/update",
  upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  protect,
  updatUserData
);
userRouter.post("/discover", protect, discoverUser);
userRouter.post("/follow", protect, followUser);
userRouter.post("/unfollow", protect, unfollowUser);

export default userRouter;

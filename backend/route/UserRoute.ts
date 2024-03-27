import { signup, login } from "../controller/AuthController";
import express from "express";
import {
  deleteUser,
  getAllUser,
  updateUser,
  userById,
} from "../controller/UserController";

const router = express.Router();

router.route("/signup").post(signup);

router.route("/login").post(login);

router.route("/").get(getAllUser);

router.route("/:id").get(userById).delete(deleteUser).put(updateUser);

export default router;

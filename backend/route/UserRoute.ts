import {
  signup,
  login,
  protectRoute,
  restrictToRoute,
  ResetPassword,
  forgotPassword,
  logout,
} from "../controller/AuthController";
import express from "express";
import {
  deleteUser,
  getAllUser,
  updateUser,
  userById,
  updateCurrentUser,
  updateMyPassword,
  deleteMe,
} from "../controller/UserController";

const router = express.Router();

router.route("/signup").post(signup);

router.route("/login").post(login);

router.route("/forgotPassword").post(forgotPassword);

router.route("/resetPassword/:token").patch(ResetPassword);

router.use(protectRoute); // applied to all routes

router.route("/logout").post(logout);

router
  .route("/updateMyPassword")
  .patch(restrictToRoute("user"), updateMyPassword);

router.route("/updateMyData").patch(restrictToRoute("user"), updateCurrentUser);

router.route("/deleteMe").delete(restrictToRoute("user"), deleteMe);

router.route("/").get(restrictToRoute("admin"), getAllUser);
router
  .route("/:id")
  .get(restrictToRoute("admin"), userById)
  .delete(restrictToRoute("admin"), deleteUser)
  .put(restrictToRoute("admin"), updateUser);

export default router;

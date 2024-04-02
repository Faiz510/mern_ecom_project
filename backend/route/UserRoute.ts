import {
  signup,
  login,
  protectRoute,
  restrictToRoute,
  ResetPassword,
  forgotPassword,
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

router.route("/").get(protectRoute, getAllUser);

router.route("/signup").post(signup);

router.route("/login").post(login);

router.route("/updateMyPassword").patch(protectRoute, updateMyPassword);

router.route("/updateMyData").patch(protectRoute, updateCurrentUser);

router.route("/deleteMe").delete(protectRoute, deleteMe);

router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword/:token").patch(ResetPassword);

router
  .route("/:id")
  .get(protectRoute, userById)
  .delete(protectRoute, restrictToRoute("admin"), deleteUser)
  .put(protectRoute, restrictToRoute("admin"), updateUser);

export default router;

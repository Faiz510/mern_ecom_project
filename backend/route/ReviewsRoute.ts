import express from "express";
import { protectRoute, restrictToRoute } from "../controller/AuthController";
import {
  addReview,
  deleteReview,
  getReviews,
  updateReview,
} from "../controller/ReviewsController";

const router = express.Router({ mergeParams: true });

// reviews
router.route("/").get(getReviews);

router.use(protectRoute, restrictToRoute("user"));

router.route("/").post(addReview);

router.route("/:id").patch(updateReview).delete(deleteReview);

export default router;

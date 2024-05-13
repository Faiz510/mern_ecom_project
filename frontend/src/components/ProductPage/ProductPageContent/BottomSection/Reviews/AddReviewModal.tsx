import React, { FormEvent, useState } from "react";
import { FaStar, FaTimes } from "react-icons/fa";
import { useAppDispatch } from "../../../../../app/hooks";
import { createReview } from "../../../../../Redux/Slice/ReviewSlice/ReviewSliceApi";
import { useParams } from "react-router-dom";

interface addReviewModalProps {
  productId: string | undefined;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddReviewModal = ({ productId, setModal }: addReviewModalProps) => {
  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>("");
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const stars = [1, 2, 3, 4, 5];

  const handleStarClick = (star: number) => {
    setRating(star);
  };

  const starRating = stars.map((star) => (
    <label
      key={star}
      htmlFor={`star-${star}`}
      className="cursor-pointer"
      onClick={() => handleStarClick(star)}
    >
      <input
        type="radio"
        id={`star-${star}`}
        name="rating"
        value={star}
        checked={star === rating}
        onChange={() => {}}
        hidden
      />
      <FaStar
        className={`text-xl ${
          star <= rating ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    </label>
  ));

  const onSubmitReview = (e: FormEvent) => {
    e.preventDefault();

    const reviewData = {
      id,
      rating,
      review: reviewText,
    };

    dispatch(createReview(reviewData));
    setModal(false);
  };

  return (
    <>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <form
          className="text-center bg-white px-10 py-6 rounded-xl relative w-[80vw] md:w-[50vw]"
          onSubmit={onSubmitReview}
        >
          <button
            className="absolute top-2 right-4"
            onClick={() => setModal(false)}
          >
            <FaTimes />
          </button>
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-bold mb-2">Leave a Review</h3>
            <div className="flex gap-2">{starRating}</div>
          </div>

          <div className="mt-4">
            <textarea
              rows={4}
              cols={30}
              placeholder="Write a review"
              className="border-2 rounded-lg focus:outline-none w-full"
              onChange={(e) => setReviewText(e.target.value)}
            ></textarea>
          </div>

          <button
            className="bg-gray-600 text-white px-4 py-2 mt-4 rounded-lg"
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
      <div
        className="fixed top-0 left-0 w-full h-full bg-black/40 z-10"
        onClick={() => setModal(false)}
      ></div>
    </>
  );
};

export default AddReviewModal;

import { useOutletContext, useParams } from "react-router-dom";
import { Product } from "../../../../Types";
import RatingStar from "../../../../Products/Card/RatingStar";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { fetchReview } from "../../../../../Redux/Slice/ReviewSlice/ReviewSliceApi";
import { useEffect } from "react";
import { RootState } from "../../../../../Redux/Store/Store";

const Reviews = () => {
  const context: Product = useOutletContext();
  const { id } = useParams();

  const reviewData = useAppSelector(
    (state: RootState) => state?.reviews?.reviews.reviews
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchReview(id));
    }
  }, [dispatch]);

  return (
    <section>
      {context?.reviewQuantity !== 0 ? (
        reviewData.map((review) => (
          <div className="flex flex-col gap-1 my-6" key={review.id}>
            <div className="flex gap-2 items-center">
              <RatingStar rating={review?.rating} />
              <span className="min-w-20 text-med">
                {review?.userId?.username}
              </span>
              <span className="text-[0.7rem] font-semibold ml-2">
                {moment(new Date(review?.createdAt)).fromNow()}
              </span>
            </div>
            <div className="text-med font-light tracking-wider">
              <span>{review?.review}</span>
            </div>
          </div>
        ))
      ) : (
        <div>No Reviews</div>
      )}
    </section>
  );
};

export default Reviews;

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchWishlistItem } from "../../Redux/Slice/WishlistSlice/wishlistSliceApi";
import Card from "../../components/Products/Card/Card";
import Loader from "../../components/Loader";
const Wishlist = () => {
  const wishlistItems = useAppSelector(
    (state) => state.wishlist.wishlist.wishlist
  );
  const wishlistItemsStatus = useAppSelector((state) => state.wishlist.status);
  const curUser = useAppSelector((state) => state.auth.currentUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchWishlistItem());
  }, [dispatch, curUser]);

  if (!wishlistItems) {
    return (
      <div className="min-h-[350px] flex justify-center items-center text-center text-4xl tracking-wide font-medium">
        Empty wishlist
      </div>
    );
  }

  if (wishlistItems?.products.length === 0) {
    return (
      <div className="min-h-[350px] flex justify-center items-center text-center text-4xl tracking-wide font-medium">
        Empty wishlist
      </div>
    );
  }

  return (
    <section className="flex justify-center items-center min-h-[500px] my-10 py-10">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {wishlistItemsStatus === "idle" ? (
          wishlistItems?.products.map((item) => (
            <Card
              title={item.product.title}
              img={item.product.thumbnail}
              price={item.product.price}
              discountPercentage={item.product.discountPercentage}
              rating={item.product.rating}
              category={item.product.category}
              id={item.product.id}
              cardList={false}
              avgRating={item.product.avgRating}
              key={item.product.id}
              description={item.product.description}
            />
          ))
        ) : (
          <div>
            <Loader />
          </div>
        )}
      </div>
    </section>
  );
};

export default Wishlist;

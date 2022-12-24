import React, { Fragment, useEffect, useState } from "react";
import * as Types from "../Store/action/types";
import "./ProductDetails.css";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  productReview,
} from "../Store/action/productAction";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { addToCarts } from "../Store/action/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";

const ProductDetails = () => {
  const { id } = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { product, error, loading } = useSelector(
    (state) => state.productDetail
  );
  const { user } = useSelector((state) => state.user);
  const { success, error: reviewError } = useSelector((state) => state.review);
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: product.ratings,
    isHalf: true,
    size: window.innerHeight < 600 ? 20 : 25,
  };
  // const options = {
  //   name: "feedback",
  //   size: "large",
  //   value: 3,

  //   precision: 0.5,
  // };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };
  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);
    dispatch(productReview(myForm));
    setOpen(false);
  };
  const increment = () => {
    if (product.stock <= quantity) return;
    let qty = quantity + 1;
    setQuantity(qty);
  };
  const decrement = () => {
    if (quantity <= 1) return;
    let qty = quantity - 1;
    setQuantity(qty);
  };
  const addToCartItems = () => {
    dispatch(addToCarts(id, quantity));
    alert.success("Item add to cart");
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Review submit successfully.");
      dispatch({ type: Types.NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, alert, error, reviewError, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} E-commerce`} />
          <div className="ProductDetails">
            <div>
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <div className="center">
                      <img
                        src={item.url}
                        key={item.url}
                        className="carouselImage"
                        alt={`${i} Slide`}
                      />
                    </div>
                  ))}
              </Carousel>
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>product #{product._id}</p>
              </div>

              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span>({product.numOfReviews} Reviews)</span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`$ ${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decrement}>-</button>
                    <input readOnly value={quantity} type="number" />
                    <button onClick={increment}>+</button>
                  </div>
                  <button
                    disabled={product.stock < 1 ? true : false}
                    onClick={addToCartItems}
                  >
                    Add to cart
                  </button>
                </div>
                <p>
                  Status:{" "}
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "OutStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                <p>Description:{product.description}</p>
              </div>
              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>

          <div className="headingReview">Review</div>
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />
              <textarea
                className="submitDialogTextAria"
                rows="5"
                cols="30"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div className="review">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard user={user} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReview">No product Review</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;

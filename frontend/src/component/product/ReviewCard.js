import React from "react";
import ReactStars from "react-rating-stars-component";
import Profile from "../../images/Profile.png";

const ReviewCard = ({ review, user }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: review.rating,
    isHalf: true,
    size: window.innerHeight < 600 ? 20 : 25,
  };
  return (
    <div className="reviewCard">
      <img src={user && user ? user.avatar.url : Profile} alt="" />
      <p>{review.name}</p>
      <ReactStars {...options} />
      <span>{review.comment}</span>
    </div>
  );
};

export default ReviewCard;

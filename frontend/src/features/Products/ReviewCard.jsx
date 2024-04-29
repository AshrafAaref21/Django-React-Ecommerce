import PropTypes from "prop-types";
import { formatDate } from "../../utils/helper";

function ReviewCard({ review }) {
  return (
    <div className="review-card my-4">
      <div className="review-content">
        <div className="d-flex justify-content-between mb-4">
          <p className="review-author">
            <strong style={{ fontSize: "16px" }}>
              {review.name.toUpperCase()}{" "}
            </strong>
            <span className="ms-4" style={{ backgroundColor: "#f5f5f5" }}>
              {" "}
              {formatDate(review.createdAt)}
            </span>
          </p>
          <div className="review-rating">{review.rating} Stars</div>
        </div>
        <p className="review-text">
          <strong># </strong>
          {review.comment}
        </p>
      </div>
    </div>
  );
}

export default ReviewCard;

ReviewCard.propTypes = {
  review: PropTypes.object.isRequired,
};

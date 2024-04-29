import { Button } from "react-bootstrap";
import { selectCurrentUser } from "../user/userSlice";
import { useSelector } from "react-redux";
import { Form } from "react-router-dom";

function AddReview() {
  const { access } = useSelector(selectCurrentUser);
  console.log(access);
  return (
    <Form method="POST">
      <div className="add-review-card mt-2">
        <input hidden name="key" value={access} />

        <h2 style={{ textAlign: "center" }}>Add Review</h2>
        <div className="d-flex justify-content-between align-items-center mx-5">
          <div className="form-group" style={{ width: "60%" }}>
            <label htmlFor="review-text">
              <h4>Review Comment:</h4>
            </label>
            <textarea
              id="review-text"
              name="comment"
              rows="4"
              cols="50"
              required></textarea>
          </div>
          <div className="form-group" style={{ width: "25%" }}>
            <label htmlFor="rating">
              <h4>Rating:</h4>
            </label>
            <input
              type="number"
              id="rating"
              name="rating"
              min="1"
              max="5"
              required
            />
          </div>
        </div>
        <Button variant="dark" className="submit-btn" type="submit">
          Submit Review
        </Button>
      </div>
    </Form>
  );
}

export default AddReview;

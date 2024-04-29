import PropTypes from "prop-types";
import { Card, Col, Image, ListGroup, Row } from "react-bootstrap";

import Rating from "../../ui/Rating";
import AddProduct from "./AddProduct";
import "./product.css";
import ReviewCard from "./ReviewCard";
import AddReview from "./AddReview";
import { selectCurrentUser } from "../user/userSlice";
import { useSelector } from "react-redux";

function ProductDetails({ product }) {
  const currentUser = useSelector(selectCurrentUser);
  console.log(currentUser._id);
  return (
    <>
      <Row>
        <Col md={4}>
          <Image
            src={product.image}
            alt={product.name}
            height="300"
            width="300"
          />
        </Col>
        <Col md={1} />
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>

            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} Reviews`}
                color="#f8e825"
              />
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>Price: ${product.price}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>Description: {product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price: </Col>
                  <Col>${product.price}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status: </Col>
                  <Col>
                    {product.countInStock > 0 ? "in Stock" : "Out Of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>
              <AddProduct product={product} />
            </ListGroup>
          </Card>
        </Col>
      </Row>
      {product.reviews.length > 0 && (
        <div
          className="add-review-card"
          style={{
            height: "215px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            marginTop: "20px",
            overflow: "scroll",
            overflowX: "hidden",
          }}>
          {product.reviews.map((review) => (
            <ReviewCard review={review} key={review._id} />
          ))}
        </div>
      )}

      {!product.reviews
        .map((review) => review.user)
        .includes(currentUser._id) && <AddReview />}
    </>
  );
}

export default ProductDetails;

ProductDetails.propTypes = {
  product: PropTypes.object,
};

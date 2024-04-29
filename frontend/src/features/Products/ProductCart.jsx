import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import Rating from "../../ui/Rating";
import { Link } from "react-router-dom";

function ProductCart({ product }) {
  return (
    <Card className="my-4 p-3 rounded" style={{ minHeight: "500px" }}>
      <Link to={`/product/${product["_id"]}`}>
        <Card.Img src={product.image} />
      </Link>

      <Card.Body className="mt-3">
        <Link to={`/product/${product["_id"]}`}>
          <Card.Title as="div" style={{ fontSize: "18px" }}>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
      </Card.Body>

      <Card.Text as="div">
        <div className="mb-5" style={{ fontSize: "18px" }}>
          {/* {product.rating} from {product.numReviews} Reviews */}
          <Rating
            value={Number(product.rating)}
            text={`${Number(product.numReviews)} Reviews`}
            color="#f8e825"
          />
        </div>
      </Card.Text>

      <Card.Text
        className="d-flex ms-auto"
        style={{ fontSize: "16px" }}
        as="h3">
        ${product.price}
      </Card.Text>
    </Card>
  );
}

export default ProductCart;

ProductCart.propTypes = {
  product: PropTypes.object,
};

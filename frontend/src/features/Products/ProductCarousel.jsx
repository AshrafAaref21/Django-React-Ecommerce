import { Carousel, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function ProductCarousel({ products }) {
  return (
    <Carousel pause="hover" className="bg-dark">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} />
            <Carousel.Caption className="carousel.caption">
              <h4>
                {product.name} (${product.price})
              </h4>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ProductCarousel;

ProductCarousel.propTypes = {
  products: PropTypes.array,
};

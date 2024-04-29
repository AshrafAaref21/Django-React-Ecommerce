import PropTypes from "prop-types";

function Rating({ value, text, color }) {
  return (
    <div className="flex">
      <div className="d-flex">
        <div className="mx-1">
          <span>
            <i
              style={{ color }}
              className={
                value >= 1
                  ? "fa-solid fa-star"
                  : value >= 0.5
                  ? "fas fa-star-half-alt"
                  : "fa-regular fa-star"
              }></i>
          </span>

          <span>
            <i
              style={{ color }}
              className={
                value >= 2
                  ? "fa-solid fa-star"
                  : value >= 1.5
                  ? "fas fa-star-half-alt"
                  : "fa-regular fa-star"
              }></i>
          </span>

          <span>
            <i
              style={{ color }}
              className={
                value >= 3
                  ? "fa-solid fa-star"
                  : value >= 2.5
                  ? "fas fa-star-half-alt"
                  : "fa-regular fa-star"
              }></i>
          </span>
          <span>
            <i
              style={{ color }}
              className={
                value >= 4
                  ? "fa-solid fa-star"
                  : value >= 3.5
                  ? "fas fa-star-half-alt"
                  : "fa-regular fa-star"
              }></i>
          </span>
          <span>
            <i
              style={{ color }}
              className={
                value >= 5
                  ? "fa-solid fa-star"
                  : value >= 4.5
                  ? "fas fa-star-half-alt"
                  : "fa-regular fa-star"
              }></i>
          </span>
        </div>
        <span className="" style={{ fontSize: "10px", marginLeft: "auto" }}>
          {text && text}
        </span>
      </div>
    </div>
  );
}

export default Rating;

Rating.propTypes = {
  value: PropTypes.number,
  text: PropTypes.string,
  color: PropTypes.string,
};

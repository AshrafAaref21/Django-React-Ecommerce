import axios from "axios";

export async function createReview(key, productId, review) {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${key}`,
    },
  };
  try {
    const { data } = await axios.post(
      `/api/products/${productId}/reviews/`,
      review,
      config
    );
    console.log(data);
    return data;
  } catch (err) {
    console.error(err.message);
    return err.message;
  }
  // return data;
}

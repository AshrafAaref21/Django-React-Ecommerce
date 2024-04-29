import axios from "axios";

// const BASE_URL = "http://127.0.0.1:8000/api/";

export async function getProducts(keyword, page) {
  const { data } = await axios.get(
    `/api/products?keyword=${keyword}&page=${page}`
  );
  return data;
}

export async function getTopProducts() {
  const { data } = await axios.get(`/api/products/top`);

  return data;
}

export async function getProduct(id) {
  const { data } = await axios.get(`/api/products/${id}`);
  return data;
}

import { addProducts } from "../features/Products/productsSlice";
import { getOrdersByAdmin, getUserById, getUsers } from "../services/adminApi";
import { getOrderByID, getUserOrders } from "../services/ordersApi";
import {
  getProduct,
  getProducts,
  getTopProducts,
} from "../services/productsApi";
import { store } from "../store";

export async function productsLoader({ request }) {
  // console.log(`params`, params.keyword);
  const obj = {};
  const url = new URL(request.url);
  const keyword = url.searchParams.get("keyword");
  const page = url.searchParams.get("page") || 1;
  // console.log(`keyword: ${keyword}`);
  const productsData = await getProducts(keyword, page);
  store.dispatch(addProducts(productsData.products));

  obj["allProducts"] = productsData;
  // console.log("productsData: ", productsData);

  const topProduuctsData = await getTopProducts();

  obj["topProducts"] = topProduuctsData;

  return obj;
}

export async function productLoader({ params }) {
  const data = await getProduct(params.productId);
  return data;
}

export async function orderLoader({ params }) {
  const userKey =
    JSON.parse(localStorage.getItem("userInfo")).access ||
    store.getState().user.currentUser.access;
  const data = await getOrderByID(params.orderId, userKey);
  return data;
}

export async function userOrdersLoader() {
  const userKey =
    JSON.parse(localStorage.getItem("userInfo")).access ||
    store.getState().user.currentUser.access;
  const data = await getUserOrders(userKey);
  // console.log(data);
  return data;
}

export async function usersLoader() {
  const userKey =
    JSON.parse(localStorage.getItem("userInfo"))?.access ||
    store.getState().user.currentUser.access;
  const data = await getUsers(userKey);
  // console.log(data);
  return data;
}

export async function userLoader({ params }) {
  const userKey =
    JSON.parse(localStorage.getItem("userInfo"))?.access ||
    store.getState().user.currentUser.access;

  const data = await getUserById(userKey, params.userId);
  // console.log(data);
  return data;
}

export async function OrdersLoader() {
  const userKey =
    JSON.parse(localStorage.getItem("userInfo")).access ||
    store.getState().user.currentUser.access;

  const data = await getOrdersByAdmin(userKey);
  // console.log(data);
  return data;
}

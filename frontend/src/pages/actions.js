import { redirect } from "react-router-dom";
import { registerUser, sendUser, updateUser } from "../services/usersApi";
import { store } from "../store";
import { setCurrentUser, updateCurrentUser } from "../features/user/userSlice";
import { sendUserOrder } from "../services/ordersApi";
import { clearCart } from "../features/cart/cartSlice";
import {
  createProductByAdmin,
  deleteProduct,
  deleteUser,
  updateOrderByAdmin,
  updateProductByAdmin,
  updateUserByAdmin,
  uploadImageByAdmin,
} from "../services/adminApi";
import {
  addProductReducer,
  deleteProductReducer,
} from "../features/Products/productsSlice";
import { createReview } from "../services/reviewsApi";

export async function loginAction({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  //   console.log("data:", data);
  //   console.log(formData);
  const user = await sendUser(data);
  if (!user.username) return { error: user };
  store.dispatch(setCurrentUser(user));
  return redirect("/cart");
}

export async function registerAction({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // console.log("data:", data);
  //   console.log(formData);
  const user = await registerUser(data);
  // console.log(user);
  if (!user.username) return { error: user };
  store.dispatch(setCurrentUser(user));
  return redirect("/");
}

export async function updateUserAction({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // console.log("data:", data);
  //   console.log(formData);
  const user = await updateUser(data);
  // console.log(user);
  // return null;
  if (!user.username) return { error: user };
  store.dispatch(updateCurrentUser(user));
  return null;
}

export async function palceOrderAction({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // console.log("data:", data);
  const proccessedData = {
    paymentMethod: data.paymentMethod,
    taxPrice: data.taxPrice,
    shippingPrice: data.shippingPrice,
    totalPrice: data.totalPrice,
    shippingAddress: JSON.parse(data.shippingAddress),
    orderItems: JSON.parse(data.orderItems),
  };
  // console.log(proccessedData);
  const order = await sendUserOrder(data.userKey, proccessedData);
  // console.log(order);
  if (!order._id) return { error: order };
  store.dispatch(clearCart());
  return redirect(`/order/${order._id}`);
}

export async function deleteUserAction({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log("data:", data);

  // return null;
  const deletRequest = await deleteUser(data);
  console.log(deletRequest);

  return redirect("/admin");
  // // console.log(order);
  // if (!order._id) return { error: order };
  // store.dispatch(clearCart());
  // return redirect(`/order/${order._id}`);
}

export async function updateUserByAdminAction({ request, params }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // console.log("data:", data);
  // console.log(formData);
  const isAdmin = data?.isAdmin === "on";
  console.log({
    userId: params.userId,
    isAdmin,
    ...data,
  });
  const user = await updateUserByAdmin({
    userId: params.userId,
    isAdmin,
    ...data,
  });
  if (user._id === store.getState().user.currentUser._id)
    store.dispatch(updateCurrentUser(user));
  console.log(user);
  // store.dispatch(updateCurrentUser(user));
  return null;
  // if (!user.username) return { error: user };
  // store.dispatch(updateCurrentUser(user));
  // return null;
}

export async function productsAction({ request }) {
  const formData = await request.formData();
  const { id, ...data } = Object.fromEntries(formData);
  switch (id) {
    case "delete-form":
      console.log("data:", data);

      // return null;
      var deleteRequest = await deleteProduct(data);
      console.log(deleteRequest);
      store.dispatch(deleteProductReducer(data.userId));

      return redirect("/admin/products");

    case "create-form":
      console.log("data:", data);
      var createRequest = await createProductByAdmin(data);
      console.log(createRequest);
      store.dispatch(addProductReducer());

      return null;

    default:
      return null;
  }
}

export async function updateProductAction({ request, params }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // console.log("data:", data);
  // console.log("data:", data.image);
  // console.log("userId", params.productId);

  // return null;
  const uploadImage = await uploadImageByAdmin(params.productId, data.image);
  console.log(uploadImage);
  const updateRequest = await updateProductByAdmin(
    { ...data, image: data.image.name },
    params.productId
  );

  console.log(updateRequest);

  return redirect("/admin/products");
}

export async function updateOrderPayAction({ request, params }) {
  const formData = await request.formData();
  const { access } = Object.fromEntries(formData);
  console.log("access: ", access);
  console.log("params.orderId: ", params.orderId);

  const updateRequest = await updateOrderByAdmin(access, params.orderId);

  console.log(updateRequest);

  return null;
}

export async function createReviewAction({ request, params }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log("data:", data);

  const sendReview = await createReview(data.key, params.productId, {
    comment: data.comment,
    rating: data.rating,
  });
  console.log(sendReview);
  // // console.log(user);
  // if (!user.username) return { error: user };
  // store.dispatch(setCurrentUser(user));
  return null;
}

import { createHashRouter, Navigate } from "react-router-dom";
import AppLayout from "../ui/AppLayout";
import HomePage from "./HomePage";
import ProductPage from "./ProductPage";
import ErrorPage from "./ErrorPage";
import {
  userOrdersLoader,
  orderLoader,
  productLoader,
  productsLoader,
  usersLoader,
  userLoader,
  OrdersLoader,
} from "./loaders";
import CartPage from "./CartPage";
import LoginPage from "./LoginPage";
import {
  createReviewAction,
  deleteUserAction,
  loginAction,
  palceOrderAction,
  productsAction,
  registerAction,
  updateOrderPayAction,
  updateProductAction,
  updateUserAction,
  updateUserByAdminAction,
} from "./actions";
import RegisterPage from "./RegisterPage";
import ProfilePage from "./ProfilePage";
import ShippingPage from "./ShippingPage";
import PlaceOrderPage from "./PlaceOrderPage";
import OrderPage from "./OrderPage";
import AdminPage from "./AdminPage";
import UserPage from "./UserPage";
import ProductsAdminPage from "./ProductsAdminPage";
import ProductAdminPage from "./ProductAdminPage";
import OrdersAdminPage from "./OrdersAdminPage";

const router = createHashRouter([
  {
    element: <AppLayout />,

    children: [
      {
        path: "/",
        element: <HomePage />,
        loader: productsLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
        action: loginAction,
        errorElement: <ErrorPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
        action: registerAction,
        errorElement: <ErrorPage />,
      },

      {
        path: "/profile",
        element: <ProfilePage />,
        loader: userOrdersLoader,
        action: updateUserAction,
        errorElement: <ErrorPage />,
      },

      {
        path: "/cart/:id?",
        element: <CartPage />,
      },

      {
        path: "/order/:orderId?",
        element: <OrderPage />,
        loader: orderLoader,
        action: updateOrderPayAction,
      },
      {
        path: "/shipping",
        element: <ShippingPage />,
      },
      {
        path: "/placeorder",
        element: <PlaceOrderPage />,
        action: palceOrderAction,
      },
      {
        path: "/product/:productId",
        element: <ProductPage />,
        loader: productLoader,
        errorElement: <ErrorPage />,
        // loader: orderLoader,

        action: createReviewAction,
      },
      {
        path: "/admin",

        children: [
          {
            index: true,
            element: <Navigate to="/admin/users" replace={true} />,
          },

          {
            path: "users",
            element: <AdminPage />,
            loader: usersLoader,
            action: deleteUserAction,
          },

          {
            path: "users/:userId",
            element: <UserPage />,
            loader: userLoader,
            action: updateUserByAdminAction,
          },

          {
            path: "products",
            element: <ProductsAdminPage />,
            action: productsAction,
          },

          {
            path: "products/:productId",
            element: <ProductAdminPage />,
            action: updateProductAction,
          },

          {
            path: "orders",
            element: <OrdersAdminPage />,
            loader: OrdersLoader,
            // action: updateProductAction,
          },
        ],
      },
    ],
  },
]);

export default router;

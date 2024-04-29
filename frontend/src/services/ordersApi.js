import axios from "axios";

export async function sendUserOrder(key, orderDetails) {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${key}`,
    },
  };
  try {
    const { data } = await axios.post("/api/orders/add/", orderDetails, config);
    console.log(data);
    return data;
  } catch (err) {
    console.error(err.message);
    return err.message;
  }
}

export async function getOrderByID(id, key) {
  const config = {
    headers: {
      Authorization: `Bearer ${key}`,
    },
  };
  try {
    const { data } = await axios.get(`/api/orders/${id}/`, config);
    // console.log(data);
    return data;
  } catch (err) {
    console.error(err.message);
    return err.message;
  }
}

export async function getUserOrders(key) {
  const config = {
    headers: {
      Authorization: `Bearer ${key}`,
    },
  };
  try {
    const { data } = await axios.get(`/api/orders/userorders/`, config);
    // console.log(data);
    return data;
  } catch (err) {
    console.error(err.message);
    return err.message;
  }
}

export async function sendPayOrder(key, id) {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${key}`,
    },
  };
  try {
    const { data } = await axios.put(`/api/orders/${id}/pay/`, config);
    console.log(data);
    return data;
  } catch (err) {
    console.error(err.message);
    return err.message;
  }
}

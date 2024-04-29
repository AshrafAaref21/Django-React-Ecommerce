import axios from "axios";

export async function getUsers(key) {
  const config = {
    headers: {
      Authorization: `Bearer ${key}`,
    },
  };
  try {
    const { data } = await axios.get(`/api/users/`, config);
    // console.log(data);
    return data;
  } catch (err) {
    console.error(err.message);
    return err.message;
  }
}

export async function deleteUser({ userId, access }) {
  const config = {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  };
  try {
    const { data } = await axios.delete(`/api/users/delete/${userId}/`, config);
    // console.log(data);
    return data;
  } catch (err) {
    console.error(err.message);
    return err.message;
  }
}

export async function getUserById(key, userId) {
  const config = {
    headers: {
      Authorization: `Bearer ${key}`,
    },
  };
  try {
    const { data } = await axios.get(`/api/users/${userId}`, config);
    // console.log(data);
    return data;
  } catch (err) {
    console.error(err.message);
    return err.message;
  }
}

export async function updateUserByAdmin({ userId, name, email, isAdmin, key }) {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${key}`,
    },
  };
  try {
    const { data } = await axios.put(
      `/api/users/update/${userId}/`,
      {
        name,
        email,
        isAdmin,
      },
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

export async function createProductByAdmin({ key, ...product }) {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${key}`,
    },
  };
  try {
    const { data } = await axios.post(`/api/products/create/`, product, config);
    console.log(data);
    return data;
  } catch (err) {
    console.error(err.message);
    return err.message;
  }
  // return data;
}

export async function deleteProduct({ productId, access }) {
  const config = {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  };
  try {
    const { data } = await axios.delete(
      `/api/products/delete/${productId}/`,
      config
    );
    // console.log(data);
    return data;
  } catch (err) {
    console.error(err.message);
    return err.message;
  }
}

export async function updateProductByAdmin({ key, ...product }, productId) {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${key}`,
    },
  };
  try {
    const { data } = await axios.put(
      `/api/products/update/${productId}/`,
      product,
      config
    );
    console.log(data);
    // console.log(data.image.file);
    return data;
  } catch (err) {
    console.error(err.message);
    return err.message;
  }
}

export async function uploadImageByAdmin(productId, image) {
  const config = {
    headers: {
      "Content-type": "multipart/form-data",
    },
  };
  try {
    const { data } = await axios.post(
      `/api/products/upload/`,
      { image, productId },
      config
    );
    return data;
  } catch (err) {
    console.error(err.message);
    return err.message;
  }
}

export async function getOrdersByAdmin(key) {
  const config = {
    headers: {
      Authorization: `Bearer ${key}`,
    },
  };
  try {
    const { data } = await axios.get(`/api/orders/`, config);
    return data;
  } catch (err) {
    console.error(err.message);
    return err.message;
  }
}

export async function updateOrderByAdmin(key, orderId) {
  const config = {
    // withCredentials: true,
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${key}`,
    },
  };

  try {
    // axios.defaults.withCredentials;
    const { data } = await axios.put(`/api/orders/${orderId}/deliver/`, config);
    return data;
  } catch (err) {
    console.error(err.message);
    return err.message;
  }
}

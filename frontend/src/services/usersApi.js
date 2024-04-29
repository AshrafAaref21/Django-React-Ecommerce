import axios from "axios";

export async function sendUser({ email, password }) {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  try {
    const { data } = await axios.post(
      "/api/users/login/",
      {
        username: email,
        password: password,
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

export async function registerUser({ name, email, password }) {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  try {
    const { data } = await axios.post(
      "/api/users/register/",
      {
        name,
        email,
        password,
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

export async function updateUser({ name, email, password, key }) {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${key}`,
    },
  };
  try {
    const { data } = await axios.put(
      "/api/users/profile/update/",
      {
        name,
        email,
        password,
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

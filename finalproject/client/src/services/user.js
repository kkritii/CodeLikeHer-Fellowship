import axios from "axios";
import config from "../config";
import { toast } from "react-toastify";

export const signupUser = async (data) => {
  try {
    const url = `${config.apiUrl}${config.endpoints.signup}`;
    const response = await axios.post(url, data);
    toast.success("Added user successfully");
    return response;
  } catch (error) {
    let errorList = error.response.data.details;
    let errorMsg = error.response.data.message;
    if (errorList) {
      errorList.forEach((error) => {
        toast.error(error);
      });
    }
    if (errorMsg) {
      toast.error(errorMsg);
    }
  }
};

export const loginUser = async (data) => {
  const url = `${config.apiUrl}${config.endpoints.login}`;
  const response = await axios.post(url, data);
  const { token, user } = response.data.data;
  localStorage.setItem("userToken", token);
  toast.success("login successful");
  return {
    ...user,
    token: token,
  };
};

export const logoutUser = async () => {
  localStorage.removeItem("userToken");
};

export const fetchUser = async () => {
  let token = localStorage.getItem("userToken");
  if (token) {
    const url = `${config.apiUrl}${config.endpoints.me}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  }
};

export const updateUser = async (data) => {
  const url = `${config.apiUrl}${config.endpoints.me}`;
  const response = await axios.put(
    url,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    },
    data
  );

  toast.success("update successful");
  return {
    response,
  };
  // toast.error(error.response?.data?.details || "Something went wrong!");
};

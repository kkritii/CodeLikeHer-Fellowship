import axios from "axios";
import config from "../config";
import { interpolate, unParseQuery } from "../utils/string";
import { toast } from "react-toastify";

export const fetchPosts = async (query) => {
  const url = `${config.apiUrl}${config.endpoints.posts}${unParseQuery(query)}`;
  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });
  return data.data;
};

export const createPost = async (data) => {
  const url = `${config.apiUrl}${config.endpoints.addPost}`;
  const response = await axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });
  return response.data.data;
};

export const updatePost = async (id) => {
  const url = `${config.apiUrl}${config.endpoints.updatePost}`;
  const response = await axios.put(interpolate(url, { id }), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });
  return response.data.id;
};

export const deletePost = async (id) => {
  const url = `${config.apiUrl}${config.endpoints.deletePost}`;
  await axios.delete(interpolate(url, { id }), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });

  toast.success("Successfuly removed");
  return id;
};

export const donatePost = async (data) => {
  const url = `${config.apiUrl}${config.endpoints.donatePost}`;
  const response = await axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });
  return response.data.data;
};

export const reportPost = async (id) => {
  const url = `${config.apiUrl}${config.endpoints.reportPost}`;
  console.log(id);
  const response = await axios.patch(interpolate(url, { id }),{}, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });
  return response.data.data;
};

import { create } from "apisauce";

const API = create({
  baseURL: "https://api.itbook.store/1.0/",
});

const getAllPosts = () => {
  return API.get("/new");
};

const getSinglePost = (isbn13: string) => {
  return API.get(`/books/${isbn13}`);
};

const getSearchPosts = (query: string, page: number) => {
  return API.get(`/search/${query}/${page}`);
};

export default {
  getAllPosts,
  getSinglePost,
  getSearchPosts,
};

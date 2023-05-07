import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "src/redux/store";
import { CardListType, CardType } from "src/utils/@globalTypes";
import { GetSearchedPostsPayload, SetAllPostsPayload } from "./@types";

type InitialType = {
  postsList: CardListType;
  chosenPost: CardType | null;
  favoriteBooks: CardListType;
  searchedPosts: CardListType;
  searchValue: string;
  isLoading: boolean;
  postCount: number;
  isVisibleModal: boolean;
  previewBook: string | null;
};

const initialState: InitialType = {
  postsList: [],
  chosenPost: null,
  favoriteBooks: [],
  searchedPosts: [],
  searchValue: "",
  isLoading: false,
  postCount: 0,
  isVisibleModal: false,
  previewBook: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getAllPosts: (_, __: PayloadAction<undefined>) => {},
    setAllPosts: (state, action: PayloadAction<CardListType>) => {
      state.postsList = action.payload;
    },
    getChosenPost: (_, __: PayloadAction<string>) => {},
    setChosenPost: (state, action: PayloadAction<CardType | null>) => {
      state.chosenPost = action.payload;
    },
    setPreviewBook: (state, action: PayloadAction<string | null>) => {
      state.previewBook = action.payload;
    },
    setModalVisibility: (state, action: PayloadAction<boolean>) => {
      state.isVisibleModal = action.payload;
    },
    setFavoriteBook: (
      state,
      action: PayloadAction<{ card: CardType | null }>
    ) => {
      const { card } = action.payload;
      const favoriteIndex = state.favoriteBooks.findIndex(
        (post) => post.isbn13 === card?.isbn13
      );

      if (favoriteIndex === -1 && card) {
        state.favoriteBooks.push(card);
      } else {
        state.favoriteBooks.splice(favoriteIndex, 1);
      }
    },
    clearFavorites: (state) => {
      state.favoriteBooks = [];
    },
    getSearchedPosts: (
      state,
      action: PayloadAction<GetSearchedPostsPayload>
    ) => {},
    setSearchedPosts: (
      state,
      {
        payload: { searchedPosts, postsCount },
      }: PayloadAction<SetAllPostsPayload>
    ) => {
      state.searchedPosts = searchedPosts;
      state.postCount = postsCount;
    },
    setSearchedValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  getAllPosts,
  setAllPosts,
  getChosenPost,
  setChosenPost,
  setFavoriteBook,
  clearFavorites,
  setSearchedPosts,
  getSearchedPosts,
  setSearchedValue,
  setLoading,
  setModalVisibility,
  setPreviewBook,
} = postSlice.actions;

export default postSlice.reducer;

export const PostSelector = {
  getAllPosts: (state: RootState) => state.posts.postsList,
  getChosenPost: (state: RootState) => state.posts.chosenPost,
  getFavoriteBook: (state: RootState) => state.posts.favoriteBooks,
  getSearchedPosts: (state: RootState) => state.posts.searchedPosts,
  getSearchValue: (state: RootState) => state.posts.searchValue,
  getSearchedPostsCount: (state: RootState) => state.posts.postCount,
  getLoading: (state: RootState) => state.posts.isLoading,
  getModalVisibility: (state: RootState) => state.posts.isVisibleModal,
  getPreviewBook: (state: RootState) => state.posts.previewBook,
};

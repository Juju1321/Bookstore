import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardListType, CardType } from "src/utils/@globalTypes";
import { RootState } from "src/redux/store";

type InitialType = {
  postsList: CardListType;
  chosenPost: CardType | null;
  favoriteBooks: CardListType;
};

const initialState: InitialType = {
  postsList: [],
  chosenPost: null,
  favoriteBooks: [],
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
  },
});

export const {
  getAllPosts,
  setAllPosts,
  getChosenPost,
  setChosenPost,
  setFavoriteBook,
} = postSlice.actions;

export default postSlice.reducer;

export const PostSelector = {
  getAllPosts: (state: RootState) => state.posts.postsList,
  getChosenPost: (state: RootState) => state.posts.chosenPost,
  getFavoriteBook: (state: RootState) => state.posts.favoriteBooks,
};

import { CardListType } from "src/utils/@globalTypes";

export type GetSearchedPostsPayload = {
  query: string;
  page: number;
};

export type SetAllPostsPayload = {
  searchedPosts: CardListType;
  postsCount: number;
};

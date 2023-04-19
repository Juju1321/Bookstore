import { CardListType } from "src/utils/@globalTypes";

export type AllPostsResponse = {
  total?: string;
  page?: string,
  books: CardListType;
};

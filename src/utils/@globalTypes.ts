export enum ButtonType {
  Primary = "Primary",
  White = "White",
  WhiteIcon = "WhiteIcon",
  PrimaryIcon = "PrimaryIcon",
}

export type CardType = {
  title: string;
  subtitle: string;
  isbn13: string;
  price: string;
  image: string;
  url: string;
};

export enum CardTypes {
  Default,
  Search,
  Cart,
}

export type CardProps = {
  card: CardType;
  type: CardTypes;
};

export type CardListType = CardType[];

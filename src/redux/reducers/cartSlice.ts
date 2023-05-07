import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardListType, CardType } from "src/utils/@globalTypes";
import { RootState } from "src/redux/store";

type InitialType = {
  cartList: CardListType;
};

const initialState: InitialType = {
  cartList: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartList: (
      state,
      action: PayloadAction<{ cartList: CardType | null }>
    ) => {
      const { cartList } = action.payload;

      const book = state.cartList.find(
        (item) => item.isbn13 === cartList?.isbn13
      );
      if (book && book.quantity) {
        book.quantity++;
      } else if (cartList) {
        state.cartList.push({ ...cartList, quantity: 1 });
      }
    },
    reduceQuantity: (state, action: PayloadAction<string>) => {
      const book = state.cartList.find(
        (item) => item.isbn13 === action.payload
      );
      if (book && book.quantity)
        book.quantity === 1 ? (book.quantity = 1) : book.quantity--;
    },
    removeBook: (state, action: PayloadAction<string>) => {
      const removeBook = state.cartList.filter(
        (item) => item.isbn13 !== action.payload
      );
      state.cartList = removeBook;
    },
    clearCart: (state) => {
      state.cartList = [];
    },
  },
});

export const { setCartList, reduceQuantity, removeBook, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

export const CartSelector = {
  getCartList: (state: RootState) => state.cart.cartList,
};

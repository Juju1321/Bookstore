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
      const cartIndex = state.cartList.findIndex(
        (post) => post.isbn13 === cartList?.isbn13
      );
      if (cartIndex === -1 && cartList) {
        state.cartList.push(cartList);
      } else {
        state.cartList.splice(cartIndex, 1);
      }
    },
  },
});

export const { setCartList } = cartSlice.actions;

export default cartSlice.reducer;

export const CartSelector = {
  getCartList: (state: RootState) => state.cart.cartList,
};

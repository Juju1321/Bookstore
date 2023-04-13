import React from "react";
import Title from "src/components/Title";
import FavoriteCardList from "src/components/FavoriteCardList/FavoriteCardList";
import { CardTypes } from "src/utils/@globalTypes";

const Cart = () => {


  return (
    <div>
      <Title title={"Your cart"} />
      <FavoriteCardList cardList={[]} type={CardTypes.Cart} />
    </div>
  );
};

export default Cart;

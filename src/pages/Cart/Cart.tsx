import React from "react";
import Title from "src/components/Title";
import FavoriteCardList from "src/components/FavoriteCardList/FavoriteCardList";
import { ButtonType, CardTypes } from "src/utils/@globalTypes";
import { useSelector } from "react-redux";
import Button from "src/components/Button";
import styles from "./Cart.module.scss";
import { CartSelector } from "src/redux/reducers/cartSlice";

const Cart = () => {
  const cartList = useSelector(CartSelector.getCartList);

  const price = cartList.reduce(
    (accumulator, item) => accumulator + +item?.price.substring(1),
    0
  );

  // const countBook = count * price

  const vat = price * 0.2;

  return (
    <div>
      <Title title={"Your cart"} />
      <FavoriteCardList cardList={cartList} type={CardTypes.Cart} />
      <div className={styles.container}>
      <div className={styles.mainPriceContainer}>
        <div className={styles.PriceAndVatContainer}>
          <div className={styles.priceContainer}>
            <div className={styles.priceTitle}>Sum total</div>
            <div className={styles.price}>{`$ ${price.toFixed(2)}`}</div>
          </div>
          <div className={styles.priceContainer}>
            <div className={styles.priceTitle}>VAT</div>
            <div className={styles.price}>{`$ ${vat.toFixed(2)}`}</div>
          </div>
        </div>
        <div className={styles.priceContainer}>
          <div className={styles.total}>total:</div>
          <div className={styles.totalSum}>{`$${(price + vat).toFixed(
            2
          )}`}</div>
        </div>
        {cartList.length > 0 ? (
          <Button
            title={"check out"}
            onClick={() => {}}
            type={ButtonType.Primary}
          />
        ) : (
          <Button
            title={"check out"}
            disabled={true}
            onClick={() => {}}
            type={ButtonType.Primary}
          />
        )}
      </div>
      </div>
    </div>
  );
};

export default Cart;

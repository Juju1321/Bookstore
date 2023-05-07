import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Title from "src/components/Title";
import FavoriteCardList from "src/components/FavoriteCardList/FavoriteCardList";
import Button from "src/components/Button";
import { ArrowIcon, CheckIcon } from "src/assets/icons";
import { ButtonType, CardTypes } from "src/utils/@globalTypes";
import { CartSelector, clearCart } from "src/redux/reducers/cartSlice";
import {
  getAllPosts,
  getChosenPost,
  PostSelector,
  setFavoriteBook,
  setModalVisibility,
  setPreviewBook,
} from "src/redux/reducers/postSlice";
import styles from "./Cart.module.scss";
import Modal from "src/components/Modal/Modal";
import { RoutesList } from "../Router";

const Cart = () => {
  const cartList = useSelector(CartSelector.getCartList);
  const isVisible = useSelector(PostSelector.getModalVisibility);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const price = cartList.reduce((accumulator, item) => {
    if (item?.quantity) {
      return accumulator + item?.quantity * +item?.price.substring(1);
    }
    return accumulator;
  }, 0);
  const vat = price * 0.2;

  const onArrowClick = () => navigate(-1);
  const onClickCheckOut = () => {
    dispatch(clearCart());
    dispatch(setModalVisibility(true));
  };
  const onCloseModal = () => {
    dispatch(setModalVisibility(false));
    dispatch(setPreviewBook(null));
  };
  const onGotoHomeClick = () => {
    navigate(RoutesList.Main);
    dispatch(setModalVisibility(false));
  }

  return (
    <div>
      <div className={styles.arrow} onClick={onArrowClick}>
        <ArrowIcon />
      </div>
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
          <Button
            title={"check out"}
            onClick={onClickCheckOut}
            disabled={!(cartList.length > 0)}
            type={ButtonType.Primary}
          />
          <Modal isVisible={isVisible} onClose={onCloseModal}>
              <div className={styles.modalContainer}>
                <div className={styles.checkIcon}>
                  <CheckIcon />
                  </div>
                <div className={styles.modalText}>Your order has been completed successfully</div>
                <Button title={"continue shopping"} onClick={onGotoHomeClick} type={ButtonType.Primary} className={styles.infoContainer}/>
              </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Cart;

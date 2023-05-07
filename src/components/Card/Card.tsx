import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import classNames from "classnames";

import { ButtonType, CardProps, CardTypes } from "src/utils/@globalTypes";
import {
  CancelIcon,
  FillStarIcon,
  HeartIcon,
  MinusIcon,
  PlusIcon,
  StarIcon,
} from "src/assets/icons";
import Button from "src/components/Button";
import { Rating } from "react-simple-star-rating";
import {
  reduceQuantity,
  setCartList,
  removeBook,
} from "src/redux/reducers/cartSlice";
import { setFavoriteBook, getChosenPost } from "src/redux/reducers/postSlice";
import styles from "./Card.module.scss";

const Card: FC<CardProps> = ({ card, type }) => {
  const { title, subtitle, image, price, isbn13, quantity } = card;

  const [color, setColor] = useState("");
  const [rating, setRating] = useState(0);

  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1149 });
  const isMobile = useMediaQuery({ minWidth: 320, maxWidth: 767 });
  const isLaptop = useMediaQuery({ minWidth: 1150 })

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const colors = ["#D7E4FD", "#CAEFF0", "#FEE9E2", "#F4EEFD"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomRating = Math.floor(Math.random() * (6 - 1) + 1);
  const cutTitle = title.substring(0, 35).concat("...");
  const titleBook = title.length < 34 ? title : cutTitle;
  const cutMobileTitle = title.substring(0, 20).concat("...");
  const titleMobile = title.length < 19 ? title : cutMobileTitle;
  const cutSubtitle = subtitle.substring(0, 90).concat("...");

  const isSearch = type === CardTypes.Search;
  const isCart = type === CardTypes.Cart;
  const isFavorite = type === CardTypes.Favorite;
  const isDefault = type === CardTypes.Default;

  useEffect(() => {
    setColor(randomColor);
    setRating(randomRating);
  }, []);

  const onPostClick = () => {
    dispatch(getChosenPost(isbn13));
    navigate(`/books/${isbn13}`);
  };
  const onFavoriteClick = () => dispatch(setFavoriteBook({ card }));
  const onRemoveBookClick = () => dispatch(removeBook(isbn13));
  const plusCount = () => dispatch(setCartList({ cartList: card }));
  const minusButton = () => dispatch(reduceQuantity(isbn13));

  return (
    <div
      className={classNames(styles.container, {
        [styles.searchContainer]: isSearch,
        [styles.cartContainer]: isCart || isFavorite,
      })}
    >
      <div
        className={classNames({
          [styles.cartBookContainer]: isCart || isFavorite,
          [styles.searchBookContainer]: isSearch,
        })}
      >
        <div className={styles.imageCancelContainer}>
        <div
          style={{ backgroundColor: color }}
          className={classNames(styles.imageContainer, {
            [styles.searchImageContainer]: isSearch,
            [styles.cartImageContainer]: isCart || isFavorite,
          })}
          onClick={onPostClick}
        >
          <img
            alt={"book"}
            src={image}
            className={classNames(styles.image, {
              [styles.searchImage]: isSearch,
              [styles.cartImage]: isCart || isFavorite,
            })}
          />
        </div>
        {isMobile && isCart && <Button
            title={<CancelIcon />}
            onClick={onRemoveBookClick}
            type={ButtonType.PrimaryIcon}
            className={styles.cancelMobileButton}
          />}
          {isMobile && isFavorite && <Button
            title={<HeartIcon />}
            onClick={onFavoriteClick}
            className={styles.favoriteHearButton}
            type={ButtonType.PrimaryIcon}
          />}
        </div>
        <div
          className={classNames(styles.infoContainer, {
            [styles.searchInfoContainer]: isSearch,
            [styles.cartInfoContainer]: isCart || isFavorite,
          })}
        >
          <div
            className={classNames(styles.title, {
              [styles.searchTitle]: isSearch,
              [styles.cartTitle]: isCart || isFavorite,
            })}
            onClick={onPostClick}
          >
            {isMobile ? titleMobile : titleBook}
          </div>
          {!isSearch && (
            <div
              className={classNames(styles.subtitle, {
                [styles.cartSubtitle]: isCart || isFavorite,
              })}
            >
              {subtitle.length < 89 ? subtitle : cutSubtitle}
            </div>
          )}
          {isFavorite && (
            <div className={styles.ratingPriceContainer}>
              <div className={classNames(styles.price, styles.cartPrice)}>
                {price}
              </div>
              <Rating
                readonly={true}
                initialValue={rating}
                emptyIcon={<StarIcon />}
                fillIcon={<FillStarIcon />}
              />
            </div>
          )}
          {isCart && (
            <div className={styles.countPriceContainer}>
              <div className={styles.countContainer}>
                <Button
                  title={<MinusIcon />}
                  onClick={minusButton}
                  disabled={quantity === 1}
                  className={classNames(styles.button, {
                    [styles.disabledButton]: quantity === 1,
                  })}
                  type={ButtonType.WhiteIcon}
                />
                <div className={styles.count}>{quantity}</div>
                <Button
                  title={<PlusIcon />}
                  onClick={plusCount}
                  className={styles.button}
                  type={ButtonType.WhiteIcon}
                />
              </div>
              {!isLaptop && <div
            className={classNames(styles.price, {
              [styles.cartPrice]: isCart,
            })}
          >
            {quantity && `$${(quantity * +price.substring(1)).toFixed(2)}`}
          </div>}
            </div>
          )}
        </div>
      </div>
      <div
        className={classNames(styles.footerContainer, {
          [styles.cartFooterContainer]: isCart || isFavorite,
        })}
      >
        {isCart && isLaptop &&  (
          <div
            className={classNames(styles.price, {
              [styles.cartPrice]: isCart,
            })}
          >
            {quantity && `$${(quantity * +price.substring(1)).toFixed(2)}`}
          </div>
        )}
        {isDefault && (
          <div
            className={classNames(styles.price, {
              [styles.cartPrice]: isCart,
            })}
          >
            {price}
          </div>
        )}
        {isCart && !isMobile && (
          <Button
            title={<CancelIcon />}
            onClick={onRemoveBookClick}
            type={ButtonType.WhiteIcon}
          />
        )}
        {isFavorite && !isMobile && (
          <Button
            title={<HeartIcon />}
            onClick={onFavoriteClick}
            className={styles.favoriteHearButton}
            type={ButtonType.WhiteIcon}
          />
        )}
        {type === CardTypes.Default && (
          <Rating
            readonly={true}
            initialValue={randomRating}
            className={styles.rating}
            emptyIcon={<StarIcon />}
            fillIcon={<FillStarIcon />}
          />
        )}
      </div>
    </div>
  );
};

export default Card;

import React, { FC, useEffect, useState } from "react";
import classNames from "classnames";

import Button from "src/components/Button";
import { ButtonType, CardProps, CardTypes } from "src/utils/@globalTypes";
import {CancelIcon, FillStarIcon, HeartIcon, MinusIcon, PlusIcon, StarIcon} from "src/assets/icons";
import styles from "./Card.module.scss";
import { useNavigate } from "react-router-dom";
import { setFavoriteBook } from "src/redux/reducers/postSlice";
import {setCartList} from "src/redux/reducers/cartSlice";
import { useDispatch } from "react-redux";
import {Rating} from "react-simple-star-rating";

const Card: FC<CardProps> = ({ card, type }) => {
  const { title, subtitle, image, price, isbn13 } = card;

  const [color, setColor] = useState("");
  const navigate = useNavigate();

  const colors = ["#D7E4FD", "#CAEFF0", "#FEE9E2", "#F4EEFD"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomRating = Math.floor(Math.random() * (6 - 1) + 1)

  const cutTitle = title.substring(0, 40).concat("...");
  const cutSubtitle = subtitle.substring(0, 90).concat("...");

  const dispatch = useDispatch();

  const [count, setCount] = useState(1);
  const countPrice = count * +price.substring(1);

  useEffect(() => {
    setColor(randomColor);
  }, []);

  const isSearch = type === CardTypes.Search;
  const isCart = type === CardTypes.Cart;
  const isFavorite = type === CardTypes.Favorite;

  const onPostClick = () => {
    navigate(`/books/${isbn13}`);
  };

  const onFavoriteClick = () => {
    dispatch(setFavoriteBook({ card }));
  };

  const onCartClick = () => {
    dispatch(setCartList({ cartList: card }));
  };


  const plusCount = () => {
    setCount(count + 1);
  };

  const minusButton = () => {
    if (count > 1) setCount(count - 1);
  };

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
          [styles.searchBookContainer]: isSearch
        })}
      >
        <div
          style={{ backgroundColor: color }}
          className={classNames(styles.imageContainer, {
            [styles.searchImageContainer]: isSearch,
            [styles.cartImageContainer]: isCart || isFavorite,
          })}
          onClick={onPostClick}
        >
          <img
            alt={"image"}
            src={image}
            className={classNames(styles.image, {
              [styles.searchImage]: isSearch,
              [styles.cartImage]: isCart || isFavorite,
            })}
          />
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
            {title.length < 39 ? title : cutTitle}
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
              <div>
              <Rating readonly={true}
                      initialValue={randomRating}
                      emptyIcon={<StarIcon />}
                      fillIcon={<FillStarIcon />}/>
              </div>
              </div>
          )}
          {isCart && (
            <div>
              <div className={styles.countContainer}>
                {count === 1 ? (
                  <Button
                    title={<MinusIcon />}
                    onClick={minusButton}
                    disabled={true}
                    className={styles.disabledButton}
                    type={ButtonType.WhiteIcon}
                  />
                ) : (
                  <Button
                    title={<MinusIcon />}
                    onClick={minusButton}
                    className={styles.button}
                    type={ButtonType.WhiteIcon}
                  />
                )}
                <div className={styles.count}>{count}</div>
                <Button
                  title={<PlusIcon />}
                  onClick={plusCount}
                  className={styles.button}
                  type={ButtonType.WhiteIcon}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        className={classNames(styles.footerContainer, {
          [styles.cartFooterContainer]: isCart || isFavorite,
        })}
      >
        {!isSearch && !isFavorite && (
          <div
            className={classNames(styles.price, {
              [styles.cartPrice]: isCart,
            })}
          >
            {`$${countPrice.toFixed(2)}`}
          </div>
        )}
        {isCart && (
          <div>
            <Button
              title={<CancelIcon />}
              onClick={onCartClick}
              type={ButtonType.WhiteIcon}
            />
          </div>
        )}
        {isFavorite && (
          <div>
            <Button
              title={<HeartIcon />}
              onClick={onFavoriteClick}
              className={styles.favoriteHearButton}
              type={ButtonType.WhiteIcon}
            />
          </div>
        )}
        {type === CardTypes.Default && <div><Rating readonly={true}
                                                    initialValue={randomRating}
                                                    className={styles.rating}
                                                    emptyIcon={<StarIcon />}
                                                    fillIcon={<FillStarIcon />}/></div>}
      </div>
    </div>
  );
};

export default Card;

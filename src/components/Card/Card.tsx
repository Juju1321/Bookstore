import React, { FC, useEffect, useState } from "react";
import classNames from "classnames";

import Button from "src/components/Button";
import { ButtonType, CardProps, CardTypes } from "src/utils/@globalTypes";
import { CancelIcon, HeartIcon } from "src/assets/icons";
import Count from "src/components/Count";
import styles from "./Card.module.scss";
import { useNavigate } from "react-router-dom";
import { setFavoriteBook } from "src/redux/reducers/postSlice";
import { useDispatch } from "react-redux";

const Card: FC<CardProps> = ({ card, type }) => {
  const { title, subtitle, image, price, isbn13 } = card;

  const [color, setColor] = useState("");
  const navigate = useNavigate();

  const colors = ["#D7E4FD", "#CAEFF0", "#FEE9E2", "#F4EEFD"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  const cutTitle = title.substring(0, 40).concat("...");
  const cutSubtitle = subtitle.substring(0, 90).concat("...");

  const dispatch = useDispatch();

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
            <div className={classNames(styles.price, styles.cartPrice)}>
              {price}
            </div>
          )}
          {isCart && (
            <div>
              <Count />
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
            {price}
          </div>
        )}
        {isCart && (
          <div>
            <Button
              title={<CancelIcon />}
              onClick={() => {}}
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
        {type === CardTypes.Default && <div></div>}
      </div>
    </div>
  );
};

export default Card;

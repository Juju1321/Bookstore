import React, { FC, useEffect, useState } from "react";
import classNames from "classnames";

import Button from "src/components/Button";
import { ButtonType, CardProps, CardTypes } from "src/utils/@globalTypes";
import { CancelIcon } from "src/assets/icons";
import Count from "src/components/Count";
import styles from "./Card.module.scss";

const Card: FC<CardProps> = ({ card, type }) => {
  const { title, subtitle, image, price } = card;

  const [color, setColor] = useState("");

  const colors = ["#D7E4FD", "#CAEFF0", "#FEE9E2", "#F4EEFD"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  const cutTitle = title.substring(0, 40).concat("...");
  const cutSubtitle = subtitle.substring(0,90).concat("...");

  useEffect(() => {
    setColor(randomColor);
  }, []);

  const isSearch = type === CardTypes.Search;
  const isCart = type === CardTypes.Cart;

  return (
    <div
      className={classNames(styles.container, {
        [styles.searchContainer]: isSearch,
        [styles.cartContainer]: isCart,
      })}
    >
      <div
        className={classNames({
          [styles.cartBookContainer]: isCart,
        })}
      >
        <div
          style={{ backgroundColor: color }}
          className={classNames(styles.imageContainer, {
            [styles.searchImageContainer]: isSearch,
            [styles.cartImageContainer]: isCart,
          })}
        >
          <img
            alt={"image"}
            src={image}
            className={classNames(styles.image, {
              [styles.searchImage]: isSearch,
              [styles.cartImage]: isCart,
            })}
          />
        </div>
        <div
          className={classNames(styles.infoContainer, {
            [styles.searchInfoContainer]: isSearch,
            [styles.cartInfoContainer]: isCart,
          })}
        >
          <div
            className={classNames(styles.title, {
              [styles.searchTitle]: isSearch,
              [styles.cartTitle]: isCart,
            })}
          >
            {title.length < 39 ? title : cutTitle}
          </div>
          {!isSearch && (
            <div
              className={classNames(styles.subtitle, {
                [styles.cartSubtitle]: isCart,
              })}
            >
              {subtitle.length < 89 ? subtitle : cutSubtitle}
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
          [styles.cartFooterContainer]: isCart,
        })}
      >
        {!isSearch && (
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
        {type === CardTypes.Default && <div></div>}
      </div>
    </div>
  );
};

export default Card;

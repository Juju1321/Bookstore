import React, { FC } from "react";
import classNames from "classnames";

import styles from "./Card.module.scss";
import Stars from "src/components/Stars";
import Button from "src/components/Button";
import { ButtonType } from "src/utils/@globalTypes";
import { CancelIcon } from "src/assets/icons";

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

const Card: FC<CardProps> = ({ card, type }) => {
  const { title, subtitle, image, price } = card;

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
            {title}
          </div>
          {!isSearch && (
            <div
              className={classNames(styles.subtitle, {
                [styles.cartSubtitle]: isCart,
              })}
            >
              {subtitle}
            </div>
          )}
          {isCart && <div></div>}
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
        {type === CardTypes.Default && (
          <div>
            <Stars />
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;

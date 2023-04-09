import React, { FC } from "react";

import { CardListType, CardTypes } from "src/utils/@globalTypes";
import Card from "src/components/Card";
import styles from "./CardList.module.scss";

type CardListProps = {
  cardList: CardListType;
};

const CardList: FC<CardListProps> = ({ cardList }) => {
  return (
    <div className={styles.container}>
      {cardList.map((item, index) => {
        if (index > 0 && index <= 12) {
          return (
            <Card card={item} key={item.isbn13} type={CardTypes.Default} />
          );
        }
      })}
    </div>
  );
};

export default CardList;

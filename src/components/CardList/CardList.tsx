import React, { FC } from "react";

import { CardListType, CardTypes } from "src/utils/@globalTypes";
import Card from "src/components/Card";
import EmptyState from "src/components/EmptyState";
import styles from "./CardList.module.scss";

type CardListProps = {
  cardList: CardListType;
};

const CardList: FC<CardListProps> = ({ cardList }) => {
  return cardList.length > 0 ? (
    <div className={styles.container}>
      {cardList.map((item, index) => {
        if (index >= 0 && index < 12) {
          return (
            <Card card={item} key={item.isbn13} type={CardTypes.Default} />
          );
        }
      })}
    </div>
  ) : (
    <EmptyState
      title={"Sorry, there's no books"}
      description={"Try to check out another category"}
    />
  );
};

export default CardList;

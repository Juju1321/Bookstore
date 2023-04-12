import React, { FC } from "react";

import { CardListType, CardTypes } from "src/utils/@globalTypes";
import Card from "src/components/Card";
import EmptyState from "src/components/EmptyState";
import styles from "./FavoriteCardList.module.scss";

type CardListProps = {
  cardList: CardListType;
};

const FavoriteCardList: FC<CardListProps> = ({ cardList }) => {
  return cardList.length > 0 ? (
    <div className={styles.container}>
      {cardList.map((item) => {
        return <Card card={item} key={item.isbn13} type={CardTypes.Favorite} />;
      })}
    </div>
  ) : (
    <EmptyState
      title={"Sorry, there's no books"}
      description={"Try to check out another category"}
    />
  );
};

export default FavoriteCardList;

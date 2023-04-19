import React, { FC } from "react";
import styles from "./SearchList.module.scss";
import EmptyState from "src/components/EmptyState";
import {CardListType, CardTypes} from "src/utils/@globalTypes";

import Card from "src/components/Card";

type SearchListProps = {
    cardList: CardListType;
};

const SearchList: FC<SearchListProps> = ({ cardList }) => {
    return cardList.length > 0 ? (
        <div className={styles.container}>
            {cardList.map((item, index) => {
                    return <Card card={item} key={item.isbn13} type={CardTypes.Default} />
            })}
        </div>
    ) : (
        <EmptyState
            title={"Sorry, there's no books"}
            description={"Try to check out another category"}
        />
    );
};

export default SearchList;
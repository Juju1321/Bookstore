import React, { FC } from "react";

import {CardListType, CardTypes} from "src/utils/@globalTypes";
import EmptyState from "src/components/EmptyState";
import Card from "src/components/Card";
import styles from "./SearchList.module.scss";

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
            title={"Sorry, nothing found"}
            description={"Try writing a different title for the book"}
        />
    );
};

export default SearchList;
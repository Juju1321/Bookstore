import React from "react";
import Title from "src/components/Title";
import CardList from "src/components/CardList";
import { useSelector } from "react-redux";
import { PostSelector } from "src/redux/reducers/postSlice";
import EmptyState from "src/components/EmptyState";
import styles from "./Search.module.scss";
import SearchList from "src/components/SearchList";

const Search = () => {
  const searchValue = useSelector(PostSelector.getSearchValue);
  const searchList = useSelector(PostSelector.getSearchedPosts);

  return (
    <div>
      <Title
        title={`"${searchValue}" search results`}
        className={styles.title}
      />
      <div
        className={styles.description}
      >{`Found ${searchList.length} books`}</div>
      <SearchList cardList={searchList} />
    </div>
  );
};
export default Search;

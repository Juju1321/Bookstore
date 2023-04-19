import React from "react";
import Title from "src/components/Title";
import { useSelector } from "react-redux";
import { PostSelector } from "src/redux/reducers/postSlice";
import styles from "./Search.module.scss";
import SearchList from "src/components/SearchList";
import Loader from "src/components/Loader";

const Search = () => {
  const searchValue = useSelector(PostSelector.getSearchValue);
  const searchList = useSelector(PostSelector.getSearchedPosts);
  const isLoading = useSelector(PostSelector.getLoading);

  return (
    <div>
      <Title
        title={`"${searchValue}" search results`}
        className={styles.title}
      />
      <div
        className={styles.description}
      >{`Found ${searchList.length} books`}</div>
      {isLoading ? <Loader /> : <SearchList cardList={searchList} />}
    </div>
  );
};
export default Search;

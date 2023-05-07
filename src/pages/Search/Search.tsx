import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useMediaQuery } from "react-responsive";
import classNames from "classnames";

import Title from "src/components/Title";
import Input from "src/components/Input";
import SearchList from "src/components/SearchList";
import Loader from "src/components/Loader";
import EmptyState from "src/components/EmptyState";
import { PostSelector, getSearchedPosts } from "src/redux/reducers/postSlice";
import styles from "./Search.module.scss";
import { CancelIcon } from "src/assets/icons";
import { RoutesList } from "../Router";

const Search = () => {
  const searchValue = useSelector(PostSelector.getSearchValue);
  const searchList = useSelector(PostSelector.getSearchedPosts);
  const postsCount = useSelector(PostSelector.getSearchedPostsCount);
  const isLoading = useSelector(PostSelector.getLoading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1149 });
  const isMobile = useMediaQuery({ minWidth: 320, maxWidth: 767 });

  const [currentPage, setCurrentPage] = useState(1);
  const [searchInputValue, setSearchValue] = useState("");

  const pagesCount = Math.ceil(postsCount / 10);

  useEffect(() => {
    const page = currentPage;
    dispatch(getSearchedPosts({ query: searchValue, page }));
  }, [currentPage, searchValue]);

  const onPageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);
  };

  const onHandleChange = (value: string) => setSearchValue(value);
  const onCancelInput = () => navigate(RoutesList.Main);


  return searchList.length > 0 ? (
    <div>
      {isTablet && <div className={styles.inputWithSearchButton}>
          <Input
            value={searchValue}
            onChange={onHandleChange}
            placeholder={"Search"}
            type={"text"}
            className={styles.input}
          />
          <div className={styles.searchIcon} onClick={onCancelInput}>
            <CancelIcon />
          </div>
        </div>}
        {isMobile && <div className={styles.inputWithSearchButton}>
          <Input
            value={searchValue}
            onChange={onHandleChange}
            placeholder={"Search"}
            type={"text"}
            className={styles.input}
          />
          <div className={styles.searchIcon} onClick={onCancelInput}>
            <CancelIcon />
          </div>
        </div>}
      <Title
        title={`"${searchValue}" search results`}
        className={styles.title}
      />
      {!isTablet && !isMobile && <div className={styles.description}>{`Found ${postsCount} books`}</div>}
      {isLoading ? <Loader /> : <SearchList cardList={searchList} />}
      {!isMobile && <ReactPaginate
        pageCount={pagesCount}
        forcePage={currentPage - 1}
        onPageChange={onPageChange}
        containerClassName={styles.pagesContainer}
        pageClassName={styles.pageNumber}
        breakClassName={styles.break}
        breakLinkClassName={styles.linkPage}
        activeLinkClassName={styles.linkPage}
        pageLinkClassName={styles.linkPage}
        activeClassName={styles.activePageNumber}
        nextClassName={classNames(styles.arrowButton, {
          [styles.blockedButton]: currentPage === pagesCount,
        })}
        previousClassName={classNames(styles.arrowButton, {
          [styles.blockedButton]: currentPage === 1,
        })}
        previousLinkClassName={styles.linkPage}
        nextLinkClassName={styles.linkPage}
      />}
    </div>
  ) : (
    <EmptyState
      title={"Nothing was found"}
      description={"Please, try another name"}
    />
  );
};
export default Search;

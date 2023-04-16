import React from "react";
import Title from "src/components/Title";
import CardList from "src/components/CardList";
import {useSelector} from "react-redux";
import {PostSelector} from "src/redux/reducers/postSlice";
import EmptyState from "src/components/EmptyState";


const Search = () => {
    const searchValue = useSelector(PostSelector.getSearchValue);
    const searchList = useSelector(PostSelector.getSearchedPosts)
    
  return searchList.length > 0 ? (
    <div>
      <Title title={`"${searchValue}" search results`} />
      <div>{`Found ${searchList.length - 1} books`}</div>
      <CardList cardList={searchList} />
    </div>
  ) : <EmptyState title={"Sorry, nothing found"} description={"Try to find something similar"} />
};

export default Search;

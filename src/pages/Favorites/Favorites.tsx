import React from "react";
import Title from "src/components/Title";
import FavoriteCardList from "src/components/FavoriteCardList/FavoriteCardList";
import { useSelector } from "react-redux";
import { PostSelector } from "src/redux/reducers/postSlice";
import { CardTypes } from "src/utils/@globalTypes";

const Favorites = () => {
  const favoriteList = useSelector(PostSelector.getFavoriteBook);

  return (
    <div>
      <div></div>
      <Title title={"Favorites"} />
      <FavoriteCardList cardList={favoriteList} type={CardTypes.Favorite} />
    </div>
  );
};

export default Favorites;

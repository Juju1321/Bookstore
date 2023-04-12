import React, { useEffect } from "react";

import styles from "./Favorites.module.scss";
import Title from "src/components/Title";
import FavoriteCardList from "src/components/FavoriteCardList/FavoriteCardList";
import {useSelector } from "react-redux";
import {PostSelector} from "src/redux/reducers/postSlice";

const Favorites = () => {
  const favoriteList = useSelector(PostSelector.getFavoriteBook);

  return (
    <div>
      <div></div>
      <Title title={"Favorites"} />
      <FavoriteCardList cardList={favoriteList} />
    </div>
  );
};

export default Favorites;

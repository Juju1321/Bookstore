import React from "react";
import Title from "src/components/Title";
import FavoriteCardList from "src/components/FavoriteCardList/FavoriteCardList";
import { useSelector } from "react-redux";
import { PostSelector } from "src/redux/reducers/postSlice";
import { CardTypes } from "src/utils/@globalTypes";
import { ArrowIcon } from "src/assets/icons";
import { useNavigate } from "react-router-dom";
import styles from "src/pages/Account/Account.module.scss";

const Favorites = () => {
  const favoriteList = useSelector(PostSelector.getFavoriteBook);

  const navigate = useNavigate();

  const onArrowClick = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className={styles.arrow} onClick={onArrowClick}>
        <ArrowIcon />
      </div>
      <Title title={"Favorites"} />
      <FavoriteCardList cardList={favoriteList} type={CardTypes.Favorite} />
    </div>
  );
};

export default Favorites;

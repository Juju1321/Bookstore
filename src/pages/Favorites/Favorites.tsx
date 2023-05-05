import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Title from "src/components/Title";
import FavoriteCardList from "src/components/FavoriteCardList/FavoriteCardList";
import Slider from "src/components/Slider";
import { getAllPosts, PostSelector } from "src/redux/reducers/postSlice";
import { CardTypes } from "src/utils/@globalTypes";
import { ArrowIcon } from "src/assets/icons";
import styles from "src/pages/Account/Account.module.scss";

const Favorites = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const favoriteList = useSelector(PostSelector.getFavoriteBook);
  const booksSliderList = useSelector(PostSelector.getAllPosts);

  const onArrowClick = () => navigate(-1);

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  return (
    <div>
      <div className={styles.arrow} onClick={onArrowClick}>
        <ArrowIcon />
      </div>
      <Title title={"Favorites"} />
      <FavoriteCardList cardList={favoriteList} type={CardTypes.Favorite} />
      <Slider booksSlider={booksSliderList} title={"Popular Books"} />
    </div>
  );
};

export default Favorites;

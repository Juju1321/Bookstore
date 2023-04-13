import React, { useEffect, useState } from "react";

import {
  CartIcon,
  FillHeartIcon,
  LogoIcon,
  SearchIcon,
  UserIcon,
} from "src/assets/icons";
import Input from "src/components/Input";
import Button from "src/components/Button";
import { ButtonType } from "src/utils/@globalTypes";
import styles from "./Header.module.scss";
import { RoutesList } from "src/pages/Router";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { PostSelector } from "src/redux/reducers/postSlice";
import { FavoriteHeartIcon } from "src/assets/icons/FavoriteHeartIcon";

const Header = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const onUserClick = () => {
    navigate(RoutesList.Auth);
  };

  const onCartClick = () => {
    navigate(RoutesList.Cart);
  };

  const [activeButton, setActiveButton] = useState(false);
  const onFavoriteClick = () => {
    navigate(RoutesList.Favorites);
  };

  const favoriteList = useSelector(PostSelector.getFavoriteBook);

  useEffect(() => {
    if (favoriteList.length > 0) {
      setActiveButton(true);
    } else {
      setActiveButton(false);
    }
  }, [favoriteList]);

  return (
    <div className={styles.container}>
      <NavLink to={RoutesList.Main}>
        <LogoIcon />
      </NavLink>
      <div>
        <Input
          value={searchValue}
          onChange={setSearchValue}
          placeholder={"Search"}
          type={"text"}
          className={styles.input}
        />
        <div className={styles.searchIcon}>
          <SearchIcon />
        </div>
      </div>
      <div className={styles.button}>
        {activeButton ? (
          <Button
            title={<FavoriteHeartIcon />}
            onClick={onFavoriteClick}
            type={ButtonType.WhiteIcon}
          />
        ) : (
          <Button
            title={<FillHeartIcon />}
            onClick={onFavoriteClick}
            type={ButtonType.WhiteIcon}
          />
        )}
        <Button
          title={<CartIcon />}
          onClick={onCartClick}
          type={ButtonType.WhiteIcon}
        />
        <Button
          title={<UserIcon />}
          onClick={onUserClick}
          type={ButtonType.WhiteIcon}
        />
      </div>
    </div>
  );
};

export default Header;

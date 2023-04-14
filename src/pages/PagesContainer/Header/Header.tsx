import React, { useEffect, useState } from "react";

import {
  ActiveCartIcon,
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
import { CartSelector } from "src/redux/reducers/cartSlice";

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
  const [activeCartButton, setActiveCartButton] = useState(false);
  const onFavoriteClick = () => {
    navigate(RoutesList.Favorites);
  };
  const favoriteList = useSelector(PostSelector.getFavoriteBook);
  const cartList = useSelector(CartSelector.getCartList);

  useEffect(() => {
    if (favoriteList.length > 0) {
      setActiveButton(true);
    } else {
      setActiveButton(false);
    }
    if (cartList.length > 0) {
      setActiveCartButton(true);
    } else {
      setActiveCartButton(false);
    }
  }, [favoriteList, cartList]);

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
        {activeCartButton ? (
          <Button
            title={<ActiveCartIcon />}
            onClick={onCartClick}
            type={ButtonType.WhiteIcon}
          />
        ) : (
          <Button
            title={<CartIcon />}
            onClick={onCartClick}
            type={ButtonType.WhiteIcon}
          />
        )}
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

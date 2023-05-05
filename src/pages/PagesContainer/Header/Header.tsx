import React, { KeyboardEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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
import { RoutesList } from "src/pages/Router";
import { setSearchedValue, PostSelector } from "src/redux/reducers/postSlice";
import { FavoriteHeartIcon } from "src/assets/icons/FavoriteHeartIcon";
import { CartSelector } from "src/redux/reducers/cartSlice";
import { ButtonType } from "src/utils/@globalTypes";
import styles from "./Header.module.scss";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [activeButton, setActiveButton] = useState(false);
  const [activeCartButton, setActiveCartButton] = useState(false);

  const favoriteList = useSelector(PostSelector.getFavoriteBook);
  const cartList = useSelector(CartSelector.getCartList);

  const onUserClick = () => navigate(RoutesList.Account);
  const onCartClick = () => navigate(RoutesList.Cart);
  const onFavoriteClick = () => navigate(RoutesList.Favorites);
  const onHandleChange = (value: string) => setSearchValue(value);

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onClickSearchButton();
    }
  };

  const onClickSearchButton = () => {
    if (searchValue) {
      dispatch(setSearchedValue(searchValue));
      navigate(`/search/${searchValue}`);
    } else {
      navigate(RoutesList.Search);
    }
  };
  const onLogoClick = () => {
    navigate(RoutesList.Main);
    setSearchValue("");
    dispatch(setSearchedValue(""));
  };

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
      <div onClick={onLogoClick}>
        <LogoIcon />
      </div>
      <div className={styles.inputWithSearchButton}>
        <Input
          value={searchValue}
          onChange={onHandleChange}
          placeholder={"Search"}
          type={"text"}
          className={styles.input}
          onKeyDown={onKeyDown}
        />
        <div className={styles.searchIcon} onClick={onClickSearchButton}>
          <SearchIcon />
        </div>
      </div>
      <div className={styles.button}>
        <Button
          title={activeButton ? <FavoriteHeartIcon /> : <FillHeartIcon />}
          onClick={onFavoriteClick}
          type={ButtonType.WhiteIcon}
        />
        <Button
          title={activeCartButton ? <ActiveCartIcon /> : <CartIcon />}
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

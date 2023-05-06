import React, { KeyboardEvent, useEffect, useState, useMemo } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import classNames from "classnames";

import {
  ActiveCartIcon,
  CancelIcon,
  CartIcon,
  FillHeartIcon,
  LogoIcon,
  MenuBurgerIcon,
  SearchIcon,
  UserIcon,
} from "src/assets/icons";
import Input from "src/components/Input";
import Button from "src/components/Button";
import { RoutesList } from "src/pages/Router";
import {
  setSearchedValue,
  PostSelector,
  clearFavorites,
} from "src/redux/reducers/postSlice";
import { FavoriteHeartIcon } from "src/assets/icons/FavoriteHeartIcon";
import { CartSelector, clearCart } from "src/redux/reducers/cartSlice";
import { removeUser } from "src/redux/reducers/userSlice";
import { ButtonType } from "src/utils/@globalTypes";
import { useAuth } from "src/hooks/useAuth";
import styles from "./Header.module.scss";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuth } = useAuth();

  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1149 });
  const isMobile = useMediaQuery({ minWidth: 320, maxWidth: 767 });

  const [searchValue, setSearchValue] = useState("");
  const [activeButton, setActiveButton] = useState(false);
  const [activeCartButton, setActiveCartButton] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  const favoriteList = useSelector(PostSelector.getFavoriteBook);
  const cartList = useSelector(CartSelector.getCartList);

  const onUserClick = () => navigate(RoutesList.Account);
  const onCartClick = () => navigate(RoutesList.Cart);
  const onFavoriteClick = () => navigate(RoutesList.Favorites);
  const onSignInClick = () => {
    navigate(RoutesList.Auth);
    setIsOpened(false);
  };
  const onHandleChange = (value: string) => setSearchValue(value);

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onClickSearchButton();
      if (isOpened) {
        setIsOpened(false);
      }
    }
  };

  const onClickSearchButton = () => {
    if (searchValue) {
      dispatch(setSearchedValue(searchValue));
      navigate(`/search/${searchValue}`);
    } else {
      navigate(RoutesList.Search);
    }
    if (isOpened) {
      setIsOpened(false);
    }
  };
  const onLogoClick = () => {
    navigate(RoutesList.Main);
    setSearchValue("");
    dispatch(setSearchedValue(""));
  };

  const onBurgerClick = () => {
    setIsOpened(!isOpened);
    setSearchValue("");
  };

  const onLogOutClick = () => {
    dispatch(removeUser());
    dispatch(clearCart());
    dispatch(clearFavorites());
    navigate(RoutesList.Main);
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

  const navButtonList = useMemo(
    () => [
      ...(!isAuth
        ? []
        : [
            {
              title: "Favorites",
              key: RoutesList.Favorites,
            },
            {
              title: "Cart",
              key: RoutesList.Cart,
            },
            {
              title: "Account",
              key: RoutesList.Account,
            },
          ]),
    ],
    [isAuth]
  );

  return (
    <div className={styles.container}>
      <div onClick={onLogoClick}>
        <LogoIcon />
      </div>
      {!isTablet && !isMobile && (
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
      )}
      <div className={styles.button}>
        {!isTablet && !isMobile && (
          <Button
            title={activeButton ? <FavoriteHeartIcon /> : <FillHeartIcon />}
            onClick={onFavoriteClick}
            type={ButtonType.WhiteIcon}
          />
        )}
        <Button
          title={activeCartButton ? <ActiveCartIcon /> : <CartIcon />}
          onClick={onCartClick}
          type={ButtonType.WhiteIcon}
        />
        {!isTablet && !isMobile && (
          <Button
            title={<UserIcon />}
            onClick={onUserClick}
            type={ButtonType.WhiteIcon}
          />
        )}
        {isTablet && (
          <Button
            title={<MenuBurgerIcon />}
            onClick={onBurgerClick}
            type={ButtonType.WhiteIcon}
          />
        )}
        {isOpened && (
          <div className={styles.mainMenuContainer}>
            <div className={styles.menuContainer}>
              <div className={styles.actionsContainer}>
                <div className={styles.headerMenuBurger}>
                  <div onClick={onBurgerClick}>
                    <CancelIcon />
                  </div>
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
                  <div
                    className={styles.searchIcon}
                    onClick={onClickSearchButton}
                  >
                    <SearchIcon />
                  </div>
                </div>
                <div className={styles.navContainer}>
                  {navButtonList.map(({ title, key }) => {
                    return (
                      <NavLink
                        to={key}
                        key={key}
                        className={classNames(styles.navButton, {
                          [styles.activeNavButton]: location.pathname === key,
                        })}
                      >
                        {title}
                      </NavLink>
                    );
                  })}
                </div>
              </div>
              <div>
                <Button
                  title={isAuth ? "Log out" : "Sign In"}
                  onClick={isAuth ? onLogOutClick : onSignInClick}
                  type={ButtonType.Primary}
                  className={styles.authButton}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;

import React, { useState } from "react";

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
import {RoutesList} from "src/pages/Router";
import {NavLink} from "react-router-dom";

const Header = () => {
  const [searchValue, setSearchValue] = useState("");

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
        <Button
          title={<FillHeartIcon />}
          onClick={() => {}}
          type={ButtonType.WhiteIcon}
        />
        <Button
          title={<CartIcon />}
          onClick={() => {}}
          type={ButtonType.WhiteIcon}
        />
        <Button
          title={<UserIcon />}
          onClick={() => {}}
          type={ButtonType.WhiteIcon}
        />
      </div>
    </div>
  );
};

export default Header;

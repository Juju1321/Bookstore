import React from "react";
import { Outlet } from "react-router-dom";

import Header from "src/pages/PagesContainer/Header/Header";
import styles from "./PagesContainer.module.scss";

const PagesContainer = () => {
  return (
    <div
      className={styles.container}
    >
      <Header />
      <div className={styles.mainInfo}>
        <Outlet />
        <div
          className={styles.footer}
        >
          <div>©2023 Bookstore</div>
          <div>All rights reserved</div>
        </div>
      </div>
    </div>
  );
};

export default PagesContainer;

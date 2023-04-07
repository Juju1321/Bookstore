import React from "react";

import { StarIcon } from "src/assets/icons";
import styles from "./Stars.module.scss";

const Stars = () => {

  const array = [...Array(5)];

  return (
    <div className={styles.star}>
      {array.map((star) => (
        <StarIcon />
      ))}
    </div>
  );
};

export default Stars;

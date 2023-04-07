import React, { useState } from "react";

import Button from "src/components/Button";
import { ButtonType } from "src/utils/@globalTypes";
import { MinusIcon, PlusIcon } from "src/assets/icons";
import styles from "./Count.module.scss";

const Count = () => {
  const [count, setCount] = useState(1);

  const minusButton = () => {
    if (count > 1) setCount(count - 1);
  };

  const plusCount = () => {
    setCount(count + 1);
  };

  return (
    <div className={styles.container}>
      {count === 1 ? (
        <Button
          title={<MinusIcon />}
          onClick={minusButton}
          disabled={true}
          className={styles.disabledButton}
          type={ButtonType.WhiteIcon}
        />
      ) : (
        <Button
          title={<MinusIcon />}
          onClick={minusButton}
          className={styles.button}
          type={ButtonType.WhiteIcon}
        />
      )}
      <div className={styles.count}>{count}</div>
      <Button
        title={<PlusIcon />}
        onClick={plusCount}
        className={styles.button}
        type={ButtonType.WhiteIcon}
      />
    </div>
  );
};

export default Count;

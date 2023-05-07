import React, { FC, ReactNode } from "react";
import classNames from "classnames";

import styles from "./AuthContainer.module.scss";

type AuthContainerProps = {
  children: ReactNode;
  className?: string;
};

const AuthContainer: FC<AuthContainerProps> = ({ children, className }) => {
  return (
    <div>
      <div className={styles.infoContainer}>
        <div className={classNames(styles.mainBlockContainer, className)}>{children}</div>
      </div>
    </div>
  );
};

export default AuthContainer;

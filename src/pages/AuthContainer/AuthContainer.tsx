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
      <div className={classNames(styles.infoContainer, className)}>
        <div className={styles.mainBlockContainer}>{children}</div>
      </div>
    </div>
  );
};

export default AuthContainer;

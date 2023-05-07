import React, { FC } from "react";

import styles from "./EmptyState.module.scss";
import { NoContentIcon } from "src/assets/icons";

type EmptyStateProps = {
  title: string;
  description: string;
};

const EmptyState: FC<EmptyStateProps> = ({ title, description }) => {
  return (
    <div className={styles.container}>
      <NoContentIcon />
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
    </div>
  );
};

export default EmptyState;

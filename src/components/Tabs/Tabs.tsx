import React, { FC, useMemo } from "react";
import classNames from "classnames";

import { TabsNames, TabsProps } from "src/components/Tabs/types";
import styles from "./Tabs.module.scss";

const Tabs: FC<TabsProps> = ({ onClick, activeTab }) => {
  const TABS_LIST = [
    { title: "Description", disabled: false, key: TabsNames.Description },
    { title: "Authors", disabled: false, key: TabsNames.Authors },
    { title: "Reviews", disabled: false, key: TabsNames.Reviews },
  ];

  const onTabClick = (key: TabsNames) => () => onClick(key);

  return (
    <div className={styles.container}>
      {TABS_LIST.map((tab) => {
        return (
          <div
            key={tab.key}
            className={classNames(styles.tab, {
              [styles.activeTab]: activeTab === tab.key,
              [styles.disabledTab]: tab.disabled,
            })}
            onClick={tab.disabled ? undefined : onTabClick(tab.key)}
          >
            {tab.title}
          </div>
        );
      })}
    </div>
  );
};

export default Tabs;

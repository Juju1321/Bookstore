import React from "react";

import styles from "./Error404NotFound.module.scss";
import {NavLink} from "react-router-dom";
import {RoutesList} from "src/pages/Router";

const Error404NotFound = () => {
        return (
            <div className={styles.container}>
                <div className={styles.error}>
                    404
                </div>
                <div className={styles.text}>
                    PAGE NOT FOUND
                </div>
                <NavLink
                    to={RoutesList.Main}
                    className={styles.btnHome}
                >
                    Back to home
                </NavLink>
            </div>
        )
    };

export default Error404NotFound;

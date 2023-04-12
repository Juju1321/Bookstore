import React, { useEffect, useState } from "react";
import Title from "src/components/Title";
import Button from "src/components/Button";
import {
  FacebookIcon,
  FillHeartIcon,
  MoreIcon,
  TwitterIcon,
} from "src/assets/icons";
import { ButtonType } from "src/utils/@globalTypes";
import Tabs from "src/components/Tabs";
import Subscribe from "src/components/Subscribe";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getChosenPost,
  PostSelector,
  setFavoriteBook,
} from "src/redux/reducers/postSlice";
import styles from "./Book.module.scss";
import { TabsNames } from "src/components/Tabs/types";
import classNames from "classnames";

const Book = () => {
  const { isbn13 } = useParams();
  const dispatch = useDispatch();

  const chosenPost = useSelector(PostSelector.getChosenPost);
  const [color, setColor] = useState("");
  const [activeTab, setActiveTab] = useState(TabsNames.Description);

  const colors = ["#D7E4FD", "#CAEFF0", "#FEE9E2", "#F4EEFD"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  const onTabClick = (key: TabsNames) => setActiveTab(key);

  const onFavoriteClick = () => {
    dispatch(setFavoriteBook({ card: chosenPost }));
  };

  const favoriteBook = useSelector(PostSelector.getFavoriteBook);
  const favoriteIndex = favoriteBook.findIndex(
    (post) => post.isbn13 === chosenPost?.isbn13
  );

  useEffect(() => {
    if (isbn13) {
      dispatch(getChosenPost(isbn13));
    }
    setColor(randomColor);
  }, []);

  return chosenPost ? (
    <div>
      <div></div>
      <Title className={styles.title} title={chosenPost?.title} />
      <div className={styles.imagePriceContainer}>
        <div>
          <div
            style={{ backgroundColor: color }}
            className={styles.imageContainer}
          >
            <img
              src={chosenPost?.image}
              alt={"book image"}
              className={styles.image}
            />
          </div>
          {favoriteIndex === -1 ? (
            <Button
              title={<FillHeartIcon />}
              onClick={onFavoriteClick}
              type={ButtonType.PrimaryIcon}
              className={styles.heartButton}
            />
          ) : (
            <Button
              title={<FillHeartIcon />}
              onClick={onFavoriteClick}
              type={ButtonType.PrimaryIcon}
              className={classNames(
                styles.heartButton,
                styles.activeHeartButton
              )}
            />
          )}
        </div>
        <div className={styles.infoBook}>
          <div className={styles.priceRatingContainer}>
            <div className={styles.price}>{chosenPost?.price}</div>
            <div></div>
          </div>
          <div className={styles.bookInfoContainer}>
            <div className={styles.bookInfo}>
              <div className={styles.nameInfo}>Authors</div>
              <div className={styles.info}>{chosenPost?.authors}</div>
            </div>
            <div className={styles.bookInfo}>
              <div className={styles.nameInfo}>Publisher</div>
              <div>{chosenPost?.publisher}</div>
            </div>
            <div className={styles.bookInfo}>
              <div className={styles.nameInfo}>Year</div>
              <div>{chosenPost?.year}</div>
            </div>
            <div className={styles.bookInfo}>
              <div className={styles.nameInfo}>Pages</div>
              <div>{chosenPost?.pages}</div>
            </div>
          </div>
          <Button
            title={"add to cart"}
            onClick={() => {}}
            type={ButtonType.Primary}
          />
          <div></div>
        </div>
      </div>
      <Tabs onClick={onTabClick} activeTab={activeTab} />
      {activeTab === TabsNames.Description && (
        <div className={styles.description}>{chosenPost?.desc}</div>
      )}
      {activeTab === TabsNames.Authors && (
        <div className={styles.description}>{chosenPost?.authors}</div>
      )}
      {activeTab === TabsNames.Reviews && (
        <div className={styles.description}>{chosenPost?.rating}</div>
      )}
      <div className={styles.socialContainer}>
        <div className={styles.socialIcon}>
          <FacebookIcon />
        </div>
        <div className={styles.socialIcon}>
          <TwitterIcon />
        </div>
        <div className={styles.socialIcon}>
          <MoreIcon />
        </div>
      </div>
      <Subscribe
        title={"Subscribe to Newsletter"}
        description={
          "Be the first to know about new IT books, upcoming releases, exclusive offers and more."
        }
      />
    </div>
  ) : null;
};

export default Book;

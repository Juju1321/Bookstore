import React, { useEffect, useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import Title from "src/components/Title";
import Button from "src/components/Button";

import {
  FacebookIcon,
  FillHeartIcon,
  FillStarIcon,
  MoreIcon,
  StarIcon,
  TwitterIcon,
} from "src/assets/icons";
import { ButtonType } from "src/utils/@globalTypes";
import Tabs from "src/components/Tabs";
import Subscribe from "src/components/Subscribe";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getChosenPost,
  PostSelector,
  setFavoriteBook,
  setModalVisibility,
  setPreviewBook,
} from "src/redux/reducers/postSlice";
import { setCartList } from "src/redux/reducers/cartSlice";
import styles from "./Book.module.scss";
import { TabsNames } from "src/components/Tabs/types";
import classNames from "classnames";
import { RoutesList } from "src/pages/Router";
import { CartSelector } from "src/redux/reducers/cartSlice";
import Loader from "src/components/Loader";
import { Rating } from "react-simple-star-rating";
import Modal from "src/components/Modal/Modal";
import { ArrowIcon } from "src/assets/icons";

const Book = () => {
  const { isbn13 } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const chosenPost = useSelector(PostSelector.getChosenPost);
  const [color, setColor] = useState("");
  const [activeTab, setActiveTab] = useState(TabsNames.Description);
  const rating = chosenPost?.rating;

  const colors = ["#D7E4FD", "#CAEFF0", "#FEE9E2", "#F4EEFD"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  const onTabClick = (key: TabsNames) => setActiveTab(key);

  const onFavoriteClick = () => {
    dispatch(setFavoriteBook({ card: chosenPost }));
  };

  const onPreviewClick = () => {
    dispatch(setModalVisibility(true));
    if (chosenPost?.pdf) {
      const previewBook = Object.values(chosenPost?.pdf);
      dispatch(setPreviewBook(previewBook[0]));
    }
  };

  const previewModal = useSelector(PostSelector.getPreviewBook);

  const onAddCartClick = () => {
    dispatch(setCartList({ cartList: chosenPost }));
  };

  const onCartClick = () => {
    navigate(RoutesList.Cart);
  };

  const cartList = useSelector(CartSelector.getCartList);
  const cartIndex = cartList.findIndex(
    (post) => post.isbn13 === chosenPost?.isbn13
  );

  const favoriteBook = useSelector(PostSelector.getFavoriteBook);
  const favoriteIndex = favoriteBook.findIndex(
    (post) => post.isbn13 === chosenPost?.isbn13
  );
  const isLoading = useSelector(PostSelector.getLoading);

  useEffect(() => {
    if (isbn13) {
      dispatch(getChosenPost(isbn13));
    }
    setColor(randomColor);
  }, []);

  const isVisible = useSelector(PostSelector.getModalVisibility);
  const onCloseModal = () => {
    dispatch(setModalVisibility(false));
    dispatch(setPreviewBook(null));
  };

  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }: any) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const changePage = (offset: number) => {
    setPageNumber((prevPage) => prevPage + offset);
  };
  const onClickPreviousPage = () => {
    changePage(-1);
  };
  const onClickNextPage = () => {
    changePage(+1);
  };

  const onArrowClick = () => {
    navigate(-1);
  };

  return chosenPost ? (
    <div>
      <div className={styles.arrow} onClick={onArrowClick}>
        <ArrowIcon />
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
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
                {rating && (
                  <div>
                    <Rating
                      readonly={true}
                      initialValue={+rating}
                      emptyIcon={<StarIcon />}
                      fillIcon={<FillStarIcon />}
                    />
                  </div>
                )}
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
              <div className={styles.buttonContainer}>
                {cartIndex === -1 ? (
                  <Button
                    title={"add to cart"}
                    onClick={onAddCartClick}
                    type={ButtonType.Primary}
                  />
                ) : (
                  <Button
                    title={"added to cart. go to cart"}
                    onClick={onCartClick}
                    type={ButtonType.Primary}
                  />
                )}
                {chosenPost.pdf && (
                  <div className={styles.preview} onClick={onPreviewClick}>
                    Preview book
                  </div>
                )}
              </div>
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
        </>
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
      <Modal isVisible={isVisible} onClose={onCloseModal}>
        <div>
          <div className={styles.pagePreviewContainer}>
            {pageNumber > 1 && (
              <div className={styles.pagePreview} onClick={onClickPreviousPage}>
                Previous page
              </div>
            )}
            <div className={styles.allPagePreview}>
              Page {pageNumber} of {numPages}
            </div>
            {numPages && pageNumber < numPages && (
              <div className={styles.pagePreview} onClick={onClickNextPage}>
                Next page
              </div>
            )}
          </div>
          <Document file={previewModal} onLoadSuccess={onDocumentLoadSuccess}>
            <Page height={788} pageNumber={pageNumber} />
          </Document>
        </div>
      </Modal>
    </div>
  ) : null;
};

export default Book;

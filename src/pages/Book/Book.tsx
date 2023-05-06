import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import classNames from "classnames";

import { Rating } from "react-simple-star-rating";
import Title from "src/components/Title";
import Button from "src/components/Button";
import Tabs from "src/components/Tabs";
import Subscribe from "src/components/Subscribe";
import Modal from "src/components/Modal/Modal";
import Slider from "src/components/Slider";
import { TabsNames } from "src/components/Tabs/types";
import { RoutesList } from "src/pages/Router";
import {
  getAllPosts,
  getChosenPost,
  PostSelector,
  setFavoriteBook,
  setModalVisibility,
  setPreviewBook,
} from "src/redux/reducers/postSlice";
import {
  FacebookIcon,
  FillHeartIcon,
  FillStarIcon,
  MoreIcon,
  StarIcon,
  TwitterIcon,
  ArrowIcon,
} from "src/assets/icons";
import { ButtonType } from "src/utils/@globalTypes";
import { setCartList, CartSelector } from "src/redux/reducers/cartSlice";
import Loader from "src/components/Loader";
import styles from "./Book.module.scss";

const Book = () => {
  const { isbn13 } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const chosenPost = useSelector(PostSelector.getChosenPost);
  const cartList = useSelector(CartSelector.getCartList);
  const favoriteBook = useSelector(PostSelector.getFavoriteBook);
  const isLoading = useSelector(PostSelector.getLoading);
  const isVisible = useSelector(PostSelector.getModalVisibility);
  const booksSliderList = useSelector(PostSelector.getAllPosts);
  const previewModal = useSelector(PostSelector.getPreviewBook);

  const [color, setColor] = useState("");
  const [activeTab, setActiveTab] = useState(TabsNames.Description);
  const colors = ["#D7E4FD", "#CAEFF0", "#FEE9E2", "#F4EEFD"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const rating = chosenPost?.rating;

  const cartIndex = cartList.findIndex(
    (post) => post.isbn13 === chosenPost?.isbn13
  );
  const favoriteIndex = favoriteBook.findIndex(
    (post) => post.isbn13 === chosenPost?.isbn13
  );

  const onTabClick = (key: TabsNames) => setActiveTab(key);
  const onFavoriteClick = () => dispatch(setFavoriteBook({ card: chosenPost }));
  const onPreviewClick = () => {
    dispatch(setModalVisibility(true));
    if (chosenPost?.pdf) {
      const previewBook = Object.values(chosenPost?.pdf);
      dispatch(setPreviewBook(previewBook[0]));
    }
  };
  const onCloseModal = () => {
    dispatch(setModalVisibility(false));
    dispatch(setPreviewBook(null));
  };
  const onAddCartClick = () => dispatch(setCartList({ cartList: chosenPost }));
  const onCartClick = () => navigate(RoutesList.Cart);

  useEffect(() => {
    if (isbn13) {
      dispatch(getChosenPost(isbn13));
    }
    setColor(randomColor);
    dispatch(getAllPosts());
  }, []);

  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const onDocumentLoadSuccess = ({ numPages }: any) => {
    setNumPages(numPages);
    setPageNumber(1);
  };
  const changePage = (offset: number) => {
    setPageNumber((prevPage) => prevPage + offset);
  };
  const onClickPreviousPage = () => changePage(-1);
  const onClickNextPage = () => changePage(+1);
  const onArrowClick = () => navigate(-1);

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
                  alt={"book"}
                  className={styles.image}
                />
                <Button
                title={<FillHeartIcon />}
                onClick={onFavoriteClick}
                type={ButtonType.PrimaryIcon}
                className={classNames(styles.heartButton, {
                  [styles.activeHeartButton]: favoriteIndex !== -1,
                })}
              />
              </div>
              
            </div>
            <div className={styles.infoBook}>
              <div className={styles.priceRatingContainer}>
                <div className={styles.price}>{chosenPost?.price}</div>
                {rating && (
                  <Rating
                    readonly={true}
                    initialValue={+rating}
                    emptyIcon={<StarIcon />}
                    fillIcon={<FillStarIcon />}
                  />
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
                <Button
                  title={
                    cartIndex === -1
                      ? "add to cart"
                      : "added to cart. go to cart"
                  }
                  onClick={cartIndex === -1 ? onAddCartClick : onCartClick}
                  type={ButtonType.Primary}
                />
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
      <Slider booksSlider={booksSliderList} title={"Similar Books"} />
      <Modal isVisible={isVisible} onClose={onCloseModal}>
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
      </Modal>
    </div>
  ) : null;
};

export default Book;

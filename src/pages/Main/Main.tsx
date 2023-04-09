import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Title from "src/components/Title";
import CardList from "src/components/CardList";
import { getAllPosts, PostSelector } from "src/redux/reducers/postSlice";
import Subscribe from "src/components/Subscribe";
import styles from "./Main.module.scss";

const Main = () => {
  const dispatch = useDispatch();
  const postsList = useSelector(PostSelector.getAllPosts);

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  return (
    <div className={styles.container}>
      <Title title={"New Releases Books"} />
      <CardList cardList={postsList} />
      <Subscribe
        title={"Subscribe to Newsletter"}
        description={
          "Be the first to know about new IT books, upcoming releases, exclusive offers and more."
        }
      />
    </div>
  );
};

export default Main;

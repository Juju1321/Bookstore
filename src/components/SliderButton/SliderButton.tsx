import React, { FC } from "react";
import { useSwiper } from "swiper/react";
import styles from "./SliderButton.module.scss";
import { LeftArrowIcon, RightArrowIcon } from "src/assets/icons";

type SliderButtonProps = {
  title?: string;
};

const SliderButton: FC<SliderButtonProps> = ({ title }) => {
  const swiper = useSwiper();

  const onPrevClick = () => {
    swiper.slidePrev();
  };

  const onNextClick = () => {
    swiper.slideNext();
  };

  return (
    <div className={styles.titleWithButton}>
      <div className={styles.title}>{title}</div>
      <div className={styles.swiperButton}>
        <div onClick={onPrevClick} className={styles.arrowButton}>
          <LeftArrowIcon />
        </div>
        <div onClick={onNextClick} className={styles.arrowButton}>
          <RightArrowIcon />
        </div>
      </div>
    </div>
  );
};

export default SliderButton;

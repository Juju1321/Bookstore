import React, { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useMediaQuery } from "react-responsive";

import Card from "src/components/Card";
import SliderButton from "src/components/SliderButton/SliderButton";
import { CardListType, CardTypes } from "src/utils/@globalTypes";
import "swiper/css";
import styles from "./Slider.module.scss";

type SliderProps = {
  booksSlider: CardListType;
  title: string;
};

const Slider: FC<SliderProps> = ({ booksSlider, title }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1149 });
  const isMobile = useMediaQuery({ minWidth: 320, maxWidth: 767 });

  return (
    <div className={styles.container}>
      <Swiper
        spaceBetween={32}
        slidesPerView={isTablet ? 2 : isMobile ? 1 : 3}
        className={styles.swiper}
      >
        <SliderButton title={title} />
        <div className={styles.sliderContainer}>
          {booksSlider.map((slide) => {
            return (
              <SwiperSlide key={slide.isbn13}>
                <Card card={slide} type={CardTypes.Default} />
              </SwiperSlide>
            );
          })}
        </div>
      </Swiper>
    </div>
  );
};

export default Slider;

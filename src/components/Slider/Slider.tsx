import React, { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

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
  return (
    <div className={styles.container}>
      <Swiper
        spaceBetween={32}
        slidesPerView={3}
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

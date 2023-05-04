import React, { FC } from "react";
import styles from "./Slider.module.scss";
import { CardListType, CardTypes } from "src/utils/@globalTypes";
import Card from "src/components/Card";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination } from "swiper";
import SliderButton from "../SliderButton/SliderButton";

type SliderProps = {
  booksSlider: CardListType;
  title: string;
};

const Slider: FC<SliderProps> = ({ booksSlider, title }) => {
  return (
    <div className={styles.container}>
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={30}
        slidesPerView={3}
        className={styles.swiper}
      >
        <SliderButton title={title} />
        <div className={styles.sliderContainer}>
          {booksSlider.map((slide) => {
            return (
              <SwiperSlide key={slide.isbn13}>
                <Card
                  card={slide}
                  key={slide.isbn13}
                  type={CardTypes.Default}
                />
              </SwiperSlide>
            );
          })}
        </div>
      </Swiper>
    </div>
  );
};

export default Slider;

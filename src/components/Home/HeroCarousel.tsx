"use client";
import { Box, Skeleton } from "@mui/material";
import Image from "next/image";
import React, { createRef, useEffect, useState } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { getBanners } from "@/services/Home/services";
import { useSelector } from "react-redux";
import { StoreState } from "@/redux/reduxStore";
import styles from "./HeroCarousel.module.css";

const HeroCarousel: React.FC = () => {
  const addressData = useSelector((state: StoreState) => state.address);
  const swiperRef = createRef<SwiperRef>();
  const [bannerData, setBannerData] = useState<string[]>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getBanners(addressData.city || "", {}).then((data) => {
      if (data) {
        setBannerData(data);
        setIsLoading(false);
      }
    });
  }, [addressData.city]);

  return (
    <Box sx={{ 
      width: "calc(100% - 70px)", // Subtracting the width of the sidebar
      position: "relative", 
      margin: "0 0 0 70px", // Adding left margin to account for the sidebar
      padding: "0 60px" 
    }}>
      <Swiper
        breakpoints={{
          360: { slidesPerView: 1 },
          768: { slidesPerView: 1 },
          1024: { slidesPerView: 1 },
          1400: { slidesPerView: 1 },
        }}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: `.${styles.swiperButtonNext}`,
          prevEl: `.${styles.swiperButtonPrev}`,
        }}
        modules={[Navigation, Autoplay]}
        loop={true}
        ref={swiperRef}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className={styles.swiperContainer}
      >
        {bannerData && bannerData.length > 0 && !isLoading ? (
          bannerData.map((item, index) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: {
                    md: "3rem",
                    xs: "10px",
                    lg: "5rem",
                    xl: "5rem",
                  },
                }}
              >
                <Image
                  src={item}
                  alt="Banner"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "0.5rem",
                    objectFit: "cover",
                    aspectRatio: "3.692307692307692",
                  }}
                  width={1920}
                  height={520}
                />
              </Box>
            </SwiperSlide>
          ))
        ) : (
          <Skeleton
            variant="rectangular"
            sx={{
              width: "100%",
              height: 300,
              borderRadius: { md: "10px", xs: "10px", lg: "10px", xl: "10px" },
            }}
          />
        )}
      </Swiper>
      <div
        className={`${styles.swiperButtonPrev} ${styles.swiperButton}`}
      ></div>
      <div
        className={`${styles.swiperButtonNext} ${styles.swiperButton}`}
      ></div>
    </Box>
  );
};

export default HeroCarousel;

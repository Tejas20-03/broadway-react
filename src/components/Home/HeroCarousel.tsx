"use client";
import { Box, Skeleton } from "@mui/material";
import Image from "next/image";
import React, { createRef, useEffect, useState } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { getBanners } from "@/services/Home/services";
import { useSelector } from "react-redux";
import { StoreState } from "@/redux/reduxStore";

const HeroCarousel: React.FC = () => {
  const pagination = {
    clickable: true,
    renderBullet: function (pagination: string) {
      return '<span class="' + pagination + '"></span>';
    },
  };
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
  useEffect(() => {
    const timer = setInterval(() => {
      swiperRef.current?.swiper.slideNext();
    }, 5000); // 3000 milliseconds = 3 seconds

    // Clear the timer when the component unmounts to prevent memory leaks.
    return () => clearInterval(timer);
  }, []);
  return (
    <>
      <Box
        sx={{
          width: "100%",
          position: "relative",
          // display: { lg: "none", xs: "block" },
          marginLeft: { md: "50px" },
        }}
      >
        <Swiper
          breakpoints={{
            360: {
              // width: 576,
              slidesPerView: 1,
            },
            768: {
              // width: 768,
              slidesPerView: 1,
            },
            1024: {
              slidesPerView: 1,
            },
            1400: {
              slidesPerView: 1,
            },
          }}
          spaceBetween={0}
          slidesPerView={1}
          pagination={true}
          modules={[Pagination]}
          loop={true}
          ref={swiperRef}
        >
          {bannerData && bannerData.length > 0 && !isLoading ? (
            bannerData.map((item, index) => (
              <SwiperSlide
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: "90%",
                    height: "auto",
                    borderRadius: {
                      md: "3rem",
                      xs: "10px",
                      lg: "5rem",
                      xl: "5rem",
                    },
                    paddingLeft: { md: "2rem", xs: "0.5rem" },
                  }}
                >
                  <Image
                    src={item}
                    alt="oops"
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
            <>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Skeleton
                  variant="rectangular"
                  sx={{
                    width: 1200,
                    height: 100,
                    borderRadius: {
                      md: "10px",
                      xs: "10px",
                      lg: "10px",
                      xl: "10px",
                    },
                    marginLeft: { md: "5.5rem", xs: "0.5rem" },
                  }}
                />
              </Box>
            </>
          )}
        </Swiper>
      </Box>
    </>
  );
};

export default HeroCarousel;

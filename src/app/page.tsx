"use client";
import "./globals.css";
import FeatureDeals from "@/components/Home/FeatureDeals";
import HeroCarousel from "@/components/Home/HeroCarousel";
import PremiumDeals from "@/components/Home/PremiumDeals";
import Tabs from "@/components/Home/Tabs";
import { getMenu, getWelcomePopup } from "@/services/Home/services";
import { MenuCategory, WelcomePopupResponse } from "@/services/Home/types";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import WelcomePopup from "../../src/components/Home/WelcomePopup";
import Head from "next/head";
import { useSelector } from "react-redux";
import { StoreState } from "@/redux/reduxStore";
import GetApp from "@/components/Common/GetApp";
import Blogs from "@/components/Home/Blogs";
import Framework7 from 'framework7'
import Framework7React from "framework7-react";

Framework7.use(Framework7React);

export default function Home() {
  const [tabs, setTabs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [menu, setMenu] = useState<MenuCategory[] | undefined>([]);
  useEffect(() => {
    setIsLoading(true);
    getMenu({}).then((data) => {
      const categoryNames: string[] = [];
      setMenu(data?.Data?.NestedMenuForMobile[0]?.MenuCategoryList);
      data?.Data.NestedMenuForMobile.forEach((nestedMenu) => {
        nestedMenu.MenuCategoryList.forEach((menuCategory) => {
          categoryNames.push(menuCategory.Name);
        });
      });
      setTabs(categoryNames);
      setIsLoading(false);
    });
  }, []);
  const [showPopUp, setShowPopUp] = useState<boolean>(false);

  const closePopUp = () => {
    setShowPopUp(false);
    localStorage.setItem("lastDisplayTime", Date.now()?.toString());
  };
  const [data, setData] = useState<WelcomePopupResponse>();
  useEffect(() => {
    getWelcomePopup({}).then((res) => {
      if (res?.responseType?.toString() === "1") {
        const lastDisplayTime: any = localStorage.getItem("lastDisplayTime");
        if (
          !lastDisplayTime &&
          Date.now() - Number(lastDisplayTime) > 15 * 60 * 1000
        ) {
          setShowPopUp(true);
        }
        setData(res);
      }
    });
  }, []);
  return (
    <>
      <Head>
        <title>Order Broadway Pizza Pakistan Online - Best Pizza Deals</title>
        <meta
          name="description"
          content="Broadway Pizza is offering online ordering services in Pakistan. Order now and get amazing discounts and coupons on pizza deals and other fast food."
        ></meta>
      </Head>
      {showPopUp && (
        <WelcomePopup onClose={closePopUp} open={showPopUp} data={data} />
      )}
      <HeroCarousel />
      {tabs.length > 0 && <Tabs tabs={tabs} isLoading={isLoading} />}
      {menu && menu?.length > 0 && (
        <Box
          sx={{
            marginLeft: "20px",
            marginBottom: "30px",
            display: { md: "none" },
          }}
        >
          <GetApp showFullContent={false} />
        </Box>
      )}
      {menu?.map((item, index) => (
        <React.Fragment key={index}>
          {index === 0 ? (
            <FeatureDeals
              isLoading={isLoading}
              data={item.MenuItemsList}
              heading={item.Name}
            />
          ) : (
            <PremiumDeals
              isLoading={isLoading}
              data={item.MenuItemsList}
              heading={item.Name}
            />
          )}
        </React.Fragment>
      ))}
      {menu && menu?.length > 0 && (
        <Box
          sx={{
            marginLeft: "20px",
            marginBottom: "30px",
            display: { md: "none" },
          }}
        >
          <GetApp showFullContent={true} />
        </Box>
      )}
      <Box sx={{ paddingBottom: 12 }}></Box>
    </>
  );
}

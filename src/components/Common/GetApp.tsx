import { Box, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { colors } from "@/constant/Colors";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});
const GetApp = () => {
  return (
    <Box sx={style.getApp}>
      <Image
        alt="oopx"
        src={"/mobile.png"}
        style={{ position: "absolute", left: 0, width: 86, height: "auto" }}
        width={146}
        height={282}
      />
      <Typography sx={style.head} className={poppins.className}>
        Get the App!
      </Typography>
      <Typography sx={style.para} className={poppins.className}>
        App is where the fun is! It’s Easy, Fast and Convenient.
      </Typography>
      <Box sx={style.downloadLinkBox}>
        <Link
          href={
            "https://play.google.com/store/apps/details?id=com.broadwaypizza.app&hl=en&gl=US"
          }
          style={{
            textDecoration: "none",
            listStyle: "none",
            color: "inherit",
          }}
        >
          <Image
            alt="oopx"
            src={"/google-play.png"}
            style={{
              width: 120,
              height: "auto",
            }}
            width={316}
            height={96}
          />
        </Link>
        <Link
          href={
            "https://apps.apple.com/tt/app/broadway-pizza-official/id1559366003"
          }
          style={{
            textDecoration: "none",
            listStyle: "none",
            color: "inherit",
          }}
        >
          <Image
            alt="oopx"
            src={"/apple.png"}
            style={{
              width: 120,
              height: "auto",
            }}
            width={324}
            height={100}
          />
        </Link>
      </Box>
    </Box>
  );
};
export default GetApp;

const style = {
  main: {
    width: "100%",
    height: "100%",
    paddingY: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    maxWidth: { xl: "1240px", lg: "1100px" },
  },
  grid: {
    display: "flex",
    flexDirection: "column",

    justifyContent: "start",
  },
  getApp: {
    width: "100%",
    position: "relative",
    paddingLeft: "90px",
    boxSizing: "border-box",
  },
  head: {
    fontSize: "24px",
    margin: "5px 0 0 0",
    color: colors.broadwayAboutHeadingColor,
    fontWeight: 600,
  },
  para: {
    margin: "5px 0 10px 0",
    opacity: 0.7,
    maxWidth: "260px",
    display: "block",
  },
  para1: {
    margin: "1rm 0",
    opacity: 0.9,
    maxWidth: { md: "400px" },
    display: "block",
    fontSize: "17px",
    width: "100%",
    textAlign: { md: "left", xs: "center" },
  },
  downloadLinkBox: {
    display: { sm: "flex", xs: "block" },
    flexDirection: "row",
    gap: "10px",
    justifyContent: "start",
    alignItems: "center",
    margin: "10px 0px",
  },
  contactApp: {
    width: "100%",
    height: "100%",
    marginBottom: { md: "0px", xs: "5rem" },
    marginTop: { md: "0px", xs: "1rem" },
  },
  socials: {
    display: "flex",
    flexDirection: "row",
    gap: "12px",
    justifyContent: "start",
    alignItems: "center",
    margin: "10px 0px 36px",
  },
};

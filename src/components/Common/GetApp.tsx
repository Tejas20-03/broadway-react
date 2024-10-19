'use client'

import { Box, Typography } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { colors } from "@/constant/Colors";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

interface GetAppProps {
  showFullContent?: boolean;
}

const GetApp: React.FC<GetAppProps> = ({ showFullContent = true }) => {
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(userAgent));
  }, []);
  return (
    <Box sx={showFullContent ? style.getApp : style.getAppCompact}>
      {showFullContent ? (
        <>
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
            App is where the fun is! It's Easy, Fast and Convenient.
          </Typography>
          <Box sx={style.downloadLinkBox}>
            <Link
              href="https://play.google.com/store/apps/details?id=com.broadwaypizza.app&hl=en&gl=US"
              style={{
                textDecoration: "none",
                listStyle: "none",
                color: "inherit",
              }}
            >
              <Image
                alt="Google Play"
                src="/google-play.png"
                style={{
                  width: 120,
                  height: "auto",
                }}
                width={316}
                height={96}
              />
            </Link>
            <Link
              href="https://apps.apple.com/tt/app/broadway-pizza-official/id1559366003"
              style={{
                textDecoration: "none",
                listStyle: "none",
                color: "inherit",
              }}
            >
              <Image
                alt="App Store"
                src="/apple.png"
                style={{
                  width: 120,
                  height: "auto",
                }}
                width={324}
                height={100}
              />
            </Link>
          </Box>
        </>
      ) : (
        <>
          <Typography sx={style.headCompact} className={poppins.className}>
            Get the App!
          </Typography>
          <Box sx={style.downloadLinkBoxCompact}>
            {isIOS ? (
              <Link href="https://apps.apple.com/tt/app/broadway-pizza-official/id1559366003">
                <Image
                  alt="App Store"
                  src="/apple.png"
                  width={100}
                  height={30}
                />
              </Link>
            ) : (
              <Link href="https://play.google.com/store/apps/details?id=com.broadwaypizza.app&hl=en&gl=US">
                <Image
                  alt="Google Play"
                  src="/google-play.png"
                  width={100}
                  height={30}
                />
              </Link>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default GetApp;

const style = {
  getApp: {
    width: "100%",
    position: "relative",
    paddingLeft: "90px",
    boxSizing: "border-box",
  },
  getAppCompact: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: '#e2fffd',
  },
  head: {
    fontSize: "24px",
    margin: "5px 0 0 0",
    color: colors.broadwayAboutHeadingColor,
    fontWeight: 600,
  },
  headCompact: {
    fontSize: "16px",
    color: colors.black,
    fontWeight: 600,
  },
  para: {
    margin: "5px 0 10px 0",
    opacity: 0.7,
    maxWidth: "260px",
    display: "block",
  },
  downloadLinkBox: {
    display: { sm: "flex", xs: "block" },
    flexDirection: "row",
    gap: "10px",
    justifyContent: "start",
    alignItems: "center",
    margin: "10px 0px",
  },
  downloadLinkBoxCompact: {
    display: "flex",
    gap: "10px",
  },
};

"use client ";
import { Box, Tooltip, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { colors } from "@/constant/Colors";
import { useSelector } from "react-redux";
import { StoreState } from "@/redux/reduxStore";
import { Poppins } from "next/font/google";
import { color } from "framer-motion";
type IProps = {
  openFeedbackDialog: (value: boolean) => void;
};
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
});
const HeaderStrip: React.FC<IProps> = ({ openFeedbackDialog }) => {
  const cartData = useSelector((state: StoreState) => state.cart);
  return (
    <Box className="showHide" sx={style.leftMenuLargeOnly}>
      <Box sx={style.iconBoxLarge}>
        <Tooltip title="Home" placement="right" arrow>
          <Link href={"/home"} style={{ textDecoration: "none" }}>
            <Box sx={style.itemContanier}>
              <Image
                src="/home.png"
                width={38}
                height={38}
                alt=";[[]d"
                style={style.iconImage}
              />
              <Typography className={poppins.className} sx={style.text}>
                Home
              </Typography>
            </Box>
          </Link>
        </Tooltip>
        <Tooltip title="Order Now" placement="right" arrow>
          <Link href={"/"} style={{ textDecoration: "none" }}>
            <Box sx={style.itemContanier}>
              <Image
                src="/bag.svg"
                width={38}
                height={38}
                alt=";[[]d"
                style={style.iconImage}
              />
              <Typography className={poppins.className} sx={style.text}>
                Order Now
              </Typography>
            </Box>
          </Link>
        </Tooltip>
        <Box sx={{ position: "relative" }}>
          <Tooltip title="Add to cart" placement="right" arrow>
            <Link href={"/cart"} style={{ textDecoration: "none" }}>
              <Box sx={style.itemContanier}>
                <Image
                  src="/bag1.png"
                  width={38}
                  height={38}
                  alt=";[[]d"
                  style={style.iconImage}
                />
                {cartData.cartProducts.length > 0 && (
                  <Box sx={style.badge}>
                    <Typography
                      className={poppins.className}
                      sx={{ fontSize: 12, color: colors.black }}
                    >
                      {cartData.cartProducts.length}
                    </Typography>
                  </Box>
                )}

                <Typography className={poppins.className} sx={style.text}>
                  Cart
                </Typography>
              </Box>
            </Link>
          </Tooltip>
        </Box>
        <Tooltip title="Menu" placement="right" arrow>
          <Link href={"/menu"} style={{ textDecoration: "none" }}>
            <Box sx={style.itemContanier}>
              <Image
                src="/menu1.png"
                width={37}
                height={37}
                alt=";[[]d"
                style={style.iconImage}
              />
              <Typography className={poppins.className} sx={style.text}>
                Menu
              </Typography>
            </Box>
          </Link>
        </Tooltip>

        <Tooltip title="Location" placement="right" arrow>
          <Link href={"/location"} style={{ textDecoration: "none" }}>
            <Box sx={style.itemContanier}>
              <Image
                src="/location1.png"
                width={38}
                height={38}
                alt=";[[]d"
                style={style.iconImage}
              />
              <Typography className={poppins.className} sx={style.text}>
                Location
              </Typography>
            </Box>
          </Link>
        </Tooltip>
        <Tooltip title="Feedback" placement="right" arrow>
          <Box
            sx={{ cursor: "pointer" }}
            onClick={() => openFeedbackDialog(true)}
          >
            <Box sx={style.itemContanier}>
              <Image
                src="/feedback1.png"
                width={38}
                height={38}
                alt=";[[]d"
                style={style.iconImage}
              />
              <Typography className={poppins.className} sx={style.text}>
                Feedback
              </Typography>
            </Box>
          </Box>
        </Tooltip>
        <Tooltip title="Franchise" placement="right" arrow>
          <Link href={"/franchise"} style={{ textDecoration: "none" }}>
            <Box sx={style.itemContanier}>
              <Image
                src="/franchise.png"
                width={38}
                height={38}
                alt=";[[]d"
                style={style.iconImage}
              />
              <Typography className={poppins.className} sx={style.text}>
                Franchise
              </Typography>
            </Box>
          </Link>
        </Tooltip>
        <Tooltip title="Contact" placement="right" arrow>
          <Link href={"/contact"} style={{ textDecoration: "none" }}>
            <Box sx={style.itemContanier}>
              <Image
                src="/contact1.png"
                width={38}
                height={38}
                alt=";[[]d"
                style={style.iconImage}
              />
              <Typography className={poppins.className} sx={style.text}>
                Contact
              </Typography>
            </Box>
          </Link>
        </Tooltip>
        <Tooltip title="Catering Event" placement="right" arrow>
          <Link href={"/catering"} style={{ textDecoration: "none" }}>
            <Box sx={style.itemContanier}>
              <Image
                src="/catering.png"
                width={38}
                height={38}
                alt=";[[]d"
                style={style.iconImage}
              />
              <Typography className={poppins.className} sx={style.text}>
                Catering Event
              </Typography>
            </Box>
          </Link>
        </Tooltip>
        <Tooltip title="Corporate Event" placement="right" arrow>
          <Link href={"/corporate"} style={{ textDecoration: "none" }}>
            <Box sx={style.itemContanier}>
              <Image
                src="/coporate.png"
                width={38}
                height={38}
                alt=";[[]d"
                style={style.iconImage}
              />
              <Typography className={poppins.className} sx={style.text}>
                Corporate Event
              </Typography>
            </Box>
          </Link>
        </Tooltip>
        <Tooltip title="Blogs" placement="right" arrow>
          <Link href={"/blogs"} style={{ textDecoration: "none" }}>
            <Box sx={style.itemContanier}>
              <Image
                src="/blog.png"
                width={38}
                height={38}
                alt=";[[]d"
                style={style.iconImage}
              />
              <Typography className={poppins.className} sx={style.text}>
                Blogs
              </Typography>
            </Box>
          </Link>
        </Tooltip>
      </Box>
    </Box>
  );
};
export default HeaderStrip;

const style = {
  leftMenuLargeOnly: {
    position: "fixed",
    height: "100vh",
    left: 0,
    top: 0,
    display: { lg: "flex", xs: "none" },
    alignItems: "center",
    justifyContent: "center",
    padding: "0.5rem",
    background: colors.primary,
    zIndex: 99,
  },
  iconBoxLarge: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  badge: {
    position: "absolute",
    top: "-5px",
    right: "5px",
    background: colors.white,
    color: colors.primary,
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  iconImage: { padding: "4px" },
  itemContanier: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // justifyContent: "space-between",
  },
  text: {
    fontSize: 10,
    fontWeight: "500",
    color: colors.white,
    marginLeft: "4px",
  },
};

"use client";
import { Box, Tooltip, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { StoreState } from "@/redux/reduxStore";
import { Poppins } from "next/font/google";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
//@ts-ignore
import { House,DocPlaintext,Cart,Pin,Person,Bars,ChatBubbleText } from 'framework7-icons/react';

type IProps = {
  openFeedbackDialog: (value: boolean) => void;
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "700"],
});

const ICON_SIZE = 30;
const ICON_ALT = "Navigation icon";

type NavItemProps = {
  href?: string;
  icon: IconType;
  title: string;
  onClick?: () => void;
  isActive: boolean;
};

const NavItem = ({
  href,
  icon: Icon,
  title,
  onClick,
  isActive,
}: NavItemProps) => {
  const cartData = useSelector((state: StoreState) => state.cart);

  return (
    <Tooltip title={title} placement="right" arrow>
      <Box
        component={onClick ? "div" : Link}
        href={href}
        onClick={onClick}
        sx={style.itemContainer}
      >
        <Box
          sx={{
            ...style.iconWrapper,
            backgroundColor:
              title === "Bar" ? "black" : isActive ? "rgb(255, 199, 20)" : "transparent",
            borderRadius: "50%",
          }}
        >
          <Icon size={ICON_SIZE} height={ICON_SIZE} width={ICON_SIZE} color={title === "Bar" ? "white" : "black"} />
        </Box>
        {title === "Cart" && cartData.cartProducts.length >= 0 && (
          <Box sx={style.badge}>
            <Typography
              className={poppins.className}
              sx={{ fontSize: 12, color: "black", backgroundColor: "rgb(255, 199, 20)" }}
            >
              {cartData.cartProducts.length}
            </Typography>
          </Box>
        )}
        {title !== "Bar" && (
          <Typography className={poppins.className} sx={style.text}>
            {title}
          </Typography>
        )}
      </Box>
    </Tooltip>
  );
};


const navItems = [
  { href: "/menu", icon: Bars, title: "Bar" },
  { href: "/", icon: House, title: "Order" },
  { href: "/menu", icon: DocPlaintext, title: "Menu" },
  { href: "/cart", icon: Cart, title: "Cart" },
  { href: "/location", icon: Pin, title: "Location" },
  { href: "/blogs", icon: ChatBubbleText, title: "Blogs" },
  { href: "/profile", icon: Person, title: "Profile" },
];

const HeaderStrip: React.FC<IProps> = ({ openFeedbackDialog }) => {
  const pathname = usePathname();

  return (
    <Box className="showHide" sx={style.leftMenuLargeOnly}>
      <Box sx={style.iconBoxLarge}>
        <Box sx={style.navItemsContainer}>
          {navItems.map((item) => (
            <NavItem
              key={item.title}
              {...item}
              isActive={pathname === item.href}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

const style = {
  leftMenuLargeOnly: {
    position: "fixed",
    height: "100vh",
    left: 0,
    top: 0,
    width: "70px",
    display: { lg: "flex", xs: "none" },
    flexDirection: "column",
    justifyContent: "space-between",
    // padding: "0.2rem 0.2rem",
    background: "white",
    zIndex: 99,
    boxShadow: "1px 0 2px rgba(0, 0, 0, 0.1)",
  },
  iconWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: ICON_SIZE + 16,
    height: ICON_SIZE + 16,
  },
  iconBoxLarge: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    paddingTop: "10px",
    paddingBottom: "20px",
  },
  badge: {
    position: "absolute",
    top: "-5px",
    right: "5px",
    background: "rgb(255, 199, 20)",
    color: "black",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  iconImage: { padding: 4 },
  itemContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    textDecoration: "none",
    textAlign: "center",
    position: "relative",
  },
  text: {
    fontSize: 12,
    fontWeight: "300",
    color: "gray",
  },
  menuIcon: {
    backgroundColor: "black",
    borderRadius: "50%",
    padding: "5px",
  },
  navItemsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
};

export default HeaderStrip;

"use client";
import { Box, Tooltip, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import { StoreState } from "@/redux/reduxStore";
import { Poppins } from "next/font/google";
import { usePathname } from "next/navigation";

type IProps = {
  openFeedbackDialog: (value: boolean) => void;
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "700"],
});

const ICON_SIZE = 32;
const ICON_ALT = "Navigation icon";

type NavItemProps = {
  href?: string;
  src: string;
  title: string;
  onClick?: () => void;
  isActive: boolean;
};

const NavItem = ({ href, src, title, onClick, isActive }: NavItemProps) => (
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
          backgroundColor: title === "Menu" ? "black" : isActive ? "orange" : "transparent",
          borderRadius: "50%",
        }}
      >
        <Image
          src={src}
          width={ICON_SIZE}
          height={ICON_SIZE}
          alt={ICON_ALT}
          style={{
            ...style.iconImage,
            filter: title === "Menu" ? "brightness(0) invert(1)" : "brightness(0)",
          }}
        />
      </Box>
      <Typography className={poppins.className} sx={style.text}>
        {title}
      </Typography>
    </Box>
  </Tooltip>
);



const navItems = [
  { href: "/menu", src: "/menu1.png", title: "Menu" },
  { href: "/home", src: "/home.png", title: "Home" },
  { href: "/", src: "/bag.svg", title: "Order Now" },
  { href: "/location", src: "/location1.png", title: "Location" },
  { href: "/franchise", src: "/franchise.png", title: "Franchise" },
  { href: "/contact", src: "/contact1.png", title: "Contact" },
  { href: "/catering", src: "/catering.png", title: "Catering Event" },
  { href: "/corporate", src: "/coporate.png", title: "Corporate Event" },
  { href: "/blogs", src: "/blog.png", title: "Blogs" },
];

const HeaderStrip: React.FC<IProps> = ({ openFeedbackDialog }) => {
  const cartData = useSelector((state: StoreState) => state.cart);
  const pathname = usePathname();

  return (
    <Box className="showHide" sx={style.leftMenuLargeOnly}>
      <Box sx={style.iconBoxLarge}>
        <Box>
          {navItems.slice(0, 5).map((item) => (
            <NavItem
              key={item.title}
              {...item}
              isActive={pathname === item.href}
            />
          ))}
        </Box>
        <Box>
          {navItems.slice(5).map((item) => (
            <NavItem
              key={item.title}
              {...item}
              isActive={pathname === item.href}
            />
          ))}
          <NavItem
            src="/feedback1.png"
            title="Feedback"
            onClick={() => openFeedbackDialog(true)}
            isActive={false}
          />
          <Box sx={{ position: "relative" }}>
            <NavItem
              href="/cart"
              src="/bag1.png"
              title="Cart"
              isActive={pathname === "/cart"}
            />
            {cartData.cartProducts.length > 0 && (
              <Box sx={style.badge}>
                <Typography
                  className={poppins.className}
                  sx={{ fontSize: 12, color: "white" }}
                >
                  {cartData.cartProducts.length}
                </Typography>
              </Box>
            )}
          </Box>
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
    padding: "1rem 0.5rem",
    background: "white",
    zIndex: 99,
  },
  
  iconWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: ICON_SIZE + 10,
    height: ICON_SIZE + 10,
  },
  iconBoxLarge: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },
  badge: {
    position: "absolute",
    top: "-5px",
    right: "5px",
    background: "black",
    color: "white",
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
};

export default HeaderStrip;

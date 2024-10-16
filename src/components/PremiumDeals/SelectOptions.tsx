import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { Poppins } from "next/font/google";
import { colors } from "@/constant/Colors";
import ExtraTopping from "./ExtraTopping";
import { MenuItemSize } from "@/services/Home/types";
import { OptionsType } from "@/redux/cart/slice";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
});

type IProps = {
  sizeList: MenuItemSize[];
  selectedIndex: number;
  setSelectedIndex: (n: number) => void;
  addOptions: (
    data: OptionsType,
    action: "add" | "remove",
    Ids: number[],
    canMultipple: boolean
  ) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  addedOptions: OptionsType[];
  required: boolean;
};

const SelectOptions: React.FC<IProps> = ({
  sizeList,
  selectedIndex,
  setSelectedIndex,
  addOptions,
  increaseQuantity,
  decreaseQuantity,
  addedOptions,
  required,
}) => {
  return (
    <>
      <Box sx={style.mainBox}>
        <Container sx={style.container}>
          {sizeList.length > 1 && (
            <Typography sx={style.heading} className={poppins.className}>
              Select Option
            </Typography>
          )}
          {sizeList.length > 1 &&
            sizeList?.map((data, index) => {
              return (
                <Box
                  sx={[
                    style.listBox,
                    selectedIndex === index && {
                      background: colors.primary,
                      color: colors.white,
                    },
                  ]}
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                >
                  <Box sx={style.dotBox}>
                    <Box sx={style.dot}></Box>
                    <Typography sx={style.name} className={poppins.className}>
                      {data.Size}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Typography
                      sx={style.cutPrice}
                      className={poppins.className}
                    >
                      Rs. {data.MinDeliveryPrice}
                    </Typography>
                    <Typography
                      sx={[style.price, { fontWeight: 600 }]}
                      className={poppins.className}
                    >
                      Rs. {data.DiscountedPrice}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          {sizeList[selectedIndex]?.FlavourAndToppingsList.map(
            (item, index) => (
              <ExtraTopping
                key={index}
                options={item}
                isMultiple={item.IsMultiple}
                addOptions={addOptions}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                addedOptions={addedOptions}
                required={required}
              />
            )
          )}
        </Container>
      </Box>
    </>
  );
};

export default SelectOptions;
const style = {
  mainBox: {
    width: "100%",
    backgroundColor: { xs: colors.lightGrey, lg: "white" },
    paddingTop: "20px",
    paddingBottom: "70px",
  },
  container: {
    maxWidth: { lg: "1400px" },
    padding: { md: "1rem", xs: "0px" },
    paddingX: "12px !important",
  },
  heading: {
    fontSize: { lg: "2.5rem", xs: "20px" },
    fontWeight: 700,
    color: "#30334F",
    paddingTop: "10px",
    paddingBottom: "8px",
    paddingLeft: "14px",
  },
  listBox: {
    position: "relative",
    backgroundColor: colors.white,
    borderRadius: "2rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: { md: "2rem", xs: "5px" },
    paddingY: "0.5rem",
    boxShadow: "7px 11px 28px -19px rgba(0,0,0,0.72)",
    cursor: "pointer",
    transition: "all ease-in-out 0.5s",
    ":hover": {
      background: colors.primary,
      color: colors.white,
    },
  },
  name: {
    fontSize: { xs: "14px", sm: "1.2rem", lg: "1.5rem" },
    fontWeight: 600,
    paddingX: { lg: "1rem", md: "1rem", xs: "0rem" },
  },
  dotBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingX: { lg: "1rem", md: "1rem", xs: "12px" },
    gap: "8px",
  },
  dot: {
    backgroundColor: "white",
    borderRadius: "50%",
    width: "8px",
    height: "8px",
    strokeWidth: " 0.5px",
    stroke: "#D9D9D9",
  },
  cutPrice: {
    fontSize: { xs: "12px", sm: "1rem", lg: "1rem" },
    fontWeight: 600,
    marginTop: { xs: "4px", sm: "8px", lg: "12px" },
    paddingRight: "4px",
    color: colors.redCut,

    textDecorationLine: "line-through",
  },
  price: {
    fontSize: { xs: "14px", sm: "1.2rem", lg: "1.5rem" },
    fontWeight: 600,
    paddingX: { lg: "0.2rem", md: "0.2rem", xs: "0rem" },
    textAlign: "flex-start",
    paddingRight: "17px !important",
  },
};

"use client";
import { Box, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import { Poppins } from "next/font/google";
import { colors } from "@/constant/Colors";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import {
  MenuItemFlavourAndTopping,
  MenuItemOption,
} from "@/services/Home/types";
import { OptionsType } from "@/redux/cart/slice";
import animationData from "../../Lottie/5qfQC8zpvx.json";
import { motion } from "framer-motion";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
});

type IProps = {
  options: MenuItemFlavourAndTopping;
  isMultiple: boolean;
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

const ExtraTopping: React.FC<IProps> = ({
  options,
  isMultiple,
  addOptions,
  increaseQuantity,
  decreaseQuantity,
  addedOptions,
  required,
}) => {
  const [showDone, setShowDone] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [animate, setAnimate] = useState<boolean>(false);
  const setSelected = (item: MenuItemOption, id: string) => {
    const list = options.OptionsList.map((item) => item.ID);
    if (isMultiple) {
      showDone.includes(id)
        ? setShowDone((prev) => prev.filter((item) => item !== id))
        : setShowDone([...showDone, id]);
      addOptions(
        {
          OptionID: item.ID,
          OptionName: item.Name,
          OptionGroupName: options.Name,
          Price: Number(item.Price),
          Quantity: quantity,
        },
        "add",
        list,
        true
      );
    } else {
      showDone.includes(id)
        ? setShowDone((prev) => prev.filter((item) => item !== id))
        : setShowDone([id]);
      addOptions(
        {
          OptionID: item.ID,
          OptionName: item.Name,
          OptionGroupName: options.Name,
          Price: Number(item.Price),
          Quantity: quantity,
        },
        "remove",
        list,
        false
      );
    }
  };
  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: animationData,
  };

  return (
    <>
      <Box sx={style.mainBox}>
        <Container sx={style.container}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              paddingTop: "10px",
            }}
          >
            <Typography sx={style.heading} className={poppins.className}>
              {options.Name}
            </Typography>
            {!isMultiple && (
              <Typography
                sx={[style.select, { color: required ? "red" : colors.black }]}
                className={poppins.className}
              >
                (Please Select)
              </Typography>
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              overflowX: "scroll",
              gap: "12px",
              width: "100%",
              paddingBottom: "5px",
            }}
            className="style-3"
          >
            {options?.OptionsList?.map((item, index) => {
              const addedIndex = addedOptions.findIndex(
                (addedOption) => addedOption.OptionID === item.ID
              );
              return (
                <motion.div
                  initial={
                    animate && showDone.includes(String(item.ID))
                      ? { opacity: 0, scale: 2 }
                      : { scale: 1 }
                  }
                  animate={
                    animate && showDone.includes(String(item.ID))
                      ? { opacity: 1, scale: 1 }
                      : { scale: 1 }
                  }
                  transition={{ duration: 0.5 }}
                >
                  <Box
                    sx={style.cardBox}
                    key={index}
                    onClick={() => {
                      setSelected(item, String(item.ID));
                      setAnimate(true);
                    }}
                  >
                    {showDone.includes(String(item.ID)) && (
                      <Box sx={style.absoluteBox}>
                        <Image
                          alt="tick"
                          src="/tick.svg"
                          width={13}
                          height={13}
                        />
                      </Box>
                    )}

                    <Box sx={style.imgBox}>
                      <Image
                        alt="oops"
                        src={item.ItemImage}
                        fill={false}
                        style={{
                          borderRadius: "21px",
                          width: "100%",
                          height: "100%",
                        }}
                        width={75}
                        height={75}
                      />
                    </Box>
                    <Box sx={style.content}>
                      {showDone.includes(String(item.ID)) &&
                        item.MultiSelect && (
                          <Box sx={style.stepperBox}>
                            <Box
                              sx={style.minus}
                              onClick={(e) => {
                                console.log(addedIndex);
                                e.stopPropagation();
                                decreaseQuantity(item.ID);
                              }}
                            ></Box>
                            <Box sx={style.inputStepper}>
                              <input
                                className="inputStepper"
                                type="text"
                                data-indexvalue="0"
                                min="0"
                                max="10"
                                step="1"
                                value={
                                  addedIndex > -1
                                    ? addedOptions[addedIndex].Quantity
                                    : 0
                                }
                                color={colors.primary}
                                style={{ color: colors.primary }}
                              />
                            </Box>
                            <Box
                              sx={style.plus}
                              onClick={(e) => {
                                e.stopPropagation();

                                increaseQuantity(item.ID);
                              }}
                            >
                              +
                            </Box>
                          </Box>
                        )}
                      <Typography
                        sx={style.title}
                        color={
                          showDone.includes(String(item.ID))
                            ? "#EC6300 !important"
                            : "inherit"
                        }
                      >
                        {item.Name}
                      </Typography>
                      <Box sx={{ width: "100px" }}>
                        {item.Price > 0 && (
                          <Typography
                            sx={style.price}
                            color={
                              showDone.includes(String(item.ID))
                                ? "#EC6300 !important"
                                : "inherit"
                            }
                          >
                            Rs. {item.Price}
                          </Typography>
                        )}

                        {item?.OriginalPrice > 0 && (
                          <Typography
                            sx={style.cutPrice}
                            color={
                              showDone.includes(String(item.ID))
                                ? "#EC6300 !important"
                                : "inherit"
                            }
                          >
                            Rs. {item.OriginalPrice}
                          </Typography>
                        )}
                        {item.Description && (
                          <Typography
                            sx={style.price}
                            color={
                              showDone.includes(String(item.ID))
                                ? "#EC6300 !important"
                                : "inherit"
                            }
                          >
                            {item.Description}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </motion.div>
              );
            })}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ExtraTopping;
const style = {
  mainBox: {
    width: "100%",

    backgroundColor: { xs: colors.lightGrey, lg: "white" },
  },
  container: {
    maxWidth: { lg: "1400px" },
    paddingX: "1rem",
  },
  heading: {
    fontSize: { lg: "1.5rem", xs: "16px" },
    fontWeight: 600,
  },
  select: {
    fontSize: { lg: "1.3rem", xs: "16px" },
    fontWeight: 400,
    marginTop: { lg: "4px" },
    marginLeft: "8px",
  },
  CarBox: {
    padding: "1rem",
    width: "100%",
  },
  content: {
    width: "100%",
    paddingTop: "10px",
    transition: "all ease-in-out 1s",
  },
  cardBox: {
    width: "100%",
    height: "100%",
    position: "relative",
    ":hover": {
      color: colors.cardHover,
    },
    paddingTop: "12px",
    marginLeft: "8px",
  },
  price: {
    paddingTop: "3px",
    color: "inherit",
    fontSize: { xs: "10px" },
  },
  cutPrice: {
    paddingTop: "3px",
    color: colors.redCut,
    fontSize: { xs: "8px" },
    textDecorationLine: "line-through",
  },
  title: {
    fontWeight: 600,
    color: "inherit",
    fontSize: { xs: "10px" },
    width: "100px",
  },
  imgBox: {
    width: "100px",
    height: "100px",
    backgroundColor: "white",
    // padding: "12px",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: " 0px 15px 22px 0px rgba(0, 0, 0, 0.09)",
  },
  absoluteBox: {
    position: "absolute",
    top: 20,
    right: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "30px",
    height: "30px",
    color: colors.white,
    backgroundColor: colors.cardHover,
    borderRadius: "50%",
  },

  number: {
    width: "100%",
    color: colors.primary,
    fontWeight: 600,
    fontSize: "17px",
    paddingX: "10px",
    justifyContent: "center",
    display: "flex",
  },
  stepperBox: {
    display: "inline-flex",
    alignItems: "stretch",
    height: "28px",
    borderRadius: "28px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12),0 1px 2px rgba(0,0,0,0.24)",
    transition: "all ease-in-out 1s",
  },
  minus: {
    width: "27px",
    borderRadius: colors.primary,

    color: colors.primary,
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    boxSizing: "border-box",
    position: "relative",
    cursor: "pointer",
    "::before": {
      content: "''",
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: colors.primary,
      borderRadius: "2px",
    },
    "::after": {
      width: "12px",
      height: "2px",
      content: "''",
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: colors.primary,
      borderRadius: "2px",
    },
  },
  inputStepper: {
    borderLeft: "1px solid rgba(0,0,0,.1)",
    borderRight: "1px solid rgba(0,0,0,.1)",
    textAlign: "center",
    width: "45px",
    color: colors.primary,
  },
  plus: {
    width: "27px",
    borderRadius: colors.primary,
    color: colors.primary,
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    boxSizing: "border-box",
    position: "relative",
    cursor: "pointer",
    // "::before": {
    //   content: "''",
    //   position: "absolute",
    //   left: "50%",
    //   top: "50%",
    //   transform: "translate(-50%, -50%)",
    //   backgroundColor: colors.primary,
    //   borderRadius: "2px",
    // },
    // "::after": {
    //   width: "12px",
    //   height: "2px",
    //   content: "''",
    //   position: "absolute",
    //   left: "50%",
    //   top: "50%",
    //   transform: "translate(-50%, -50%)",
    //   backgroundColor: colors.primary,
    //   borderRadius: "2px",
    // },
  },
};

import { Box, Typography } from "@mui/material";
import React from "react";
import { Poppins } from "next/font/google";
import { colors } from "@/constant/Colors";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

type IProps = {
  description: string;
  price: number;
  cutPrice: number;
};
const TextOfPremium: React.FunctionComponent<IProps> = ({
  description,
  price,
  cutPrice,
}) => {
  return (
    <Box sx={styles.container}>
      <Typography className={poppins.className} sx={styles.descriptionText}>
        {description}
      </Typography>
      <Box sx={styles.priceContanier}>
        {price > 0 && (
          <Typography className={poppins.className} sx={styles.text}>
            Rs. {price}
          </Typography>
        )}
        {cutPrice > 0 && (
          <Typography className={poppins.className} sx={[styles.cutText]}>
            Rs. {cutPrice}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default TextOfPremium;

const styles = {
  text: {
    color: "#30334F",
    textAlign: "center",
    marginTop: "5px",
    marginBottom: "10px",
    fontWeight: 700,
    fontSize: { lg: "2rem", md: "1.5rem", xs: "18px" },
    lineHeight: { xs: "normal", md: "55px" },
  },
  descriptionText: {
    textAlign: "center",
    color: "#30334F",
    fontWeight: 400,
    fontSize: { lg: "2rem", md: "1.5rem", xs: "1rem" },
    lineHeight: { xs: "normal", md: "40px", xl: "62px" },
  },
  container: {
    width: "100%",
    height: "100%",
    paddingX: "25px",
  },
  priceContanier: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cutText: {
    color: colors.redCut,

    textAlign: "center",
    marginTop: "5px",
    marginBottom: "4px",
    fontWeight: 400,
    fontSize: { lg: "2rem", md: "1.5rem", xs: "12px" },
    lineHeight: { xs: "normal", md: "55px" },
    marginLeft: "2px",
    textDecorationLine: "line-through",
  },
};

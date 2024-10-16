import { Skeleton, Typography } from "@mui/material";
import React from "react";
import { Poppins } from "next/font/google";
import { colors } from "../../constant/Colors";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

type Iprops = {
  heading: string;
  isLoading: boolean;
};

const Heading: React.FC<Iprops> = ({ heading = "", isLoading }) => {
  return (
    <React.Fragment>
      {heading !== "" && (
        <Typography
          variant="h2"
          sx={style.heading}
          className={poppins.className}
          id={heading}
        >
          {!isLoading ? heading : <Skeleton width={330} />}
        </Typography>
      )}
    </React.Fragment>
  );
};

export default Heading;
const style = {
  heading: {
    letterSpacing: "normal",
    fontWeight: 700,
    fontSize: { lg: "3rem", xs: "20px" },
    marginLeft: { lg: "1rem", xs: "13px", md: "2rem" },

    color: colors.haeding,
  },
};

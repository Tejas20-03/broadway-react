import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import Heading from "../Common/Heading";
import { colors } from "../../constant/Colors";
import FeatureDealsCard from "../Common/FeatureDealsCard";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { MenuItem } from "@/services/Home/types";
import { useSelector } from "react-redux";
import { StoreState } from "@/redux/reduxStore";
import PremiumDealsCard from "../Common/PremiumDealsCard";

type Iprops = {
  data: MenuItem[];
  heading: string;
  isLoading: boolean;
};

const FeatureDeals: React.FC<Iprops> = ({ data = [], heading, isLoading }) => {
  const addressData = useSelector((state: StoreState) => state.address);
  return (
    <>
      <Box sx={style.main}>
        {data.filter((item) =>
          item.Name.toLowerCase().includes(
            addressData.search?.toLowerCase() || ""
          )
        ).length > 0 && (
          <Box sx={style.subBox}>
            <Heading heading={heading} isLoading={isLoading} />
            <Box
              sx={{
                marginLeft: { lg: "1rem", xs: "0px" },
                marginTop: "12px",
                width: "100%", // Change this to 100%
                overflow: "hidden",
              }}
            >
              <Grid container spacing={2} sx={{ width: "100%" }}>
                {data &&
                  data.filter((item) =>
                    item.Name.toLowerCase().includes(
                      addressData.search?.toLowerCase() || ""
                    )
                  ).length > 0 &&
                  data
                    .filter((item) =>
                      item.Name.toLowerCase().includes(
                        addressData.search?.toLowerCase() || ""
                      )
                    )
                    .map((item, index) => {
                      return (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                          <PremiumDealsCard
                            isLoading={isLoading}
                            text={item.Name}
                            price={item.MinDeliveryPrice?.toString()}
                            src={item.ImageBase64}
                            discountedPrice={item.DiscountedPrice?.toString()}
                            id={item.ID}
                            discount={item?.DiscountPercentage}
                            serving={item?.Serving}
                            isNew={item.IsNewItem}
                            description={item.Description}
                          />
                        </Grid>
                      );
                    })}
              </Grid>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default FeatureDeals;
const style = {
  main: {
    width: "100%",
    paddingBottom: { md: "10px", xs: "8px" },
    backgroundColor: colors.background,
    margin: { md: "50px" },
  },
  subBox: {
    paddingLeft: { lg: "5rem", xs: "5px" },
    paddingBottom: "10px",
    paddingRight: { lg: "0px", xs: "5px" },
  },
  mainCardBox: {
    width: "100%",
  },

  card: {
    display: "flex",
    flexDirection: "row",
    padding: "1rem",
    borderRadius: "1rem",
    boxShadow: 4,
    margin: "1rem",
  },
  media: {
    width: "180px",
    height: "180px",
    borderRadius: "1rem",
  },
  price: {
    fontWeight: 600,
  },
  text: {
    paddingY: "1rem",
    color: colors.grey,
    width: "230px",
  },
  content: {
    marginLeft: "0.8rem",
    marginTop: "0.5rem",
  },
  title: {
    paddingY: "0.5rem",
    width: "100%",
    textAlign: "center",
  },
  titleBox: {
    backgroundColor: "grey",
    borderRadius: "1rem",
    width: "100%",
  },
};

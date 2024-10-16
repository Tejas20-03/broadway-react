import { Box, Typography } from "@mui/material";
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
                width: "100%",
                paddingRight: "7px",
                paddingBottom: "13px",
                paddingTop: "20px",
              }}
            >
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
                    const background =
                      index % 3 === 0
                        ? colors.tab1
                        : index % 3 === 1
                        ? colors.tab2
                        : colors.tab3;
                    return (
                      <Box sx={{ paddingBottom: "10px" }}>
                        <FeatureDealsCard
                          isLoading={isLoading}
                          text={item.Name}
                          price={item.MinDeliveryPrice?.toString()}
                          src={item.ImageBase64}
                          background={background}
                          discountedPrice={item.DiscountedPrice?.toString()}
                          id={item.ID}
                          discount={item?.DiscountPercentage}
                          serving={Number(item?.Serving)}
                          isNew={item.IsNewItem}
                          description={item.Description}
                        />
                      </Box>
                    );
                  })}
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
    paddingLeft: { lg: "5rem", xs: "12px" },
    backgroundColor: colors.background,
    marginTop: "10.6px",
    marginLeft: { md: "50px" },
  },
  subBox: {},
  mainCardBox: {
    width: "100%",
  },
};

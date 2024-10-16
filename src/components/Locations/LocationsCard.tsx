"use client";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { colors } from "@/constant/Colors";
import { getOutletsforLocation } from "@/services/location/services";
import { GetOutletsforLocationResponse } from "@/services/location/types";
type IProps = {
  ImageURL: string;
  Name: string;
};
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

const LocationsCard: React.FunctionComponent<IProps> = ({ ImageURL, Name }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<GetOutletsforLocationResponse[]>([]);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const handlerLocationPopup = (val: boolean) => {
    if (val) {
      setOpen(val);

      setIsloading(true);
      getOutletsforLocation(Name, {})
        .then((data) => data && setData(data))
        .catch((err) => console.log(err))
        .finally(() => {
          setIsloading(false);
        });
    } else setOpen(val);
  };
  return (
    <Grid item lg={4} sm={6} xs={12}>
      <Box sx={style.pad} onClick={() => handlerLocationPopup(true)}>
        <Image
          alt="oopd"
          src={ImageURL}
          width={240}
          height={240}
          style={{ borderRadius: "16px" }}
        />
      </Box>
      {open && (
        <Modal
          open={open}
          onClose={() => handlerLocationPopup(false)}
          sx={style.modal}
          disableAutoFocus
        >
          <Box sx={style.modalContanier}>
            <Box sx={style.modalInner}>
              <Box sx={style.arrowContanier}>
                <ArrowBackIcon
                  sx={style.arrow}
                  onClick={() => handlerLocationPopup(false)}
                />
              </Box>

              <Box sx={style.outletName}>
                <Typography sx={style.ouletNameText}>
                  Broadway Pizza {Name}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                overflowY: "scroll",
                height: {
                  xs: window.innerHeight,
                  sm: window.innerHeight,
                  md: "550px",
                },
                paddingBottom: 8,
              }}
            >
              {data && data.length > 0 && !isLoading ? (
                data.map((item, index) => (
                  <Box sx={style.outletContanier} key={index}>
                    <Typography sx={style.outletText}>{item.Name}</Typography>
                    <Typography sx={style.locationText}>
                      {item.address}
                    </Typography>
                    <Button
                      variant="outlined"
                      sx={style.buttonText}
                      href={item.maplink}
                      target="_blank"
                    >
                      GET DIRECTION
                    </Button>
                    <Divider sx={{ paddingY: "3px" }} />
                  </Box>
                ))
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    alignSelf: "center",
                    marginTop: "20px",
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress size={40} sx={{ color: colors.primary }} />
                </Box>
              )}
            </Box>
          </Box>
        </Modal>
      )}
    </Grid>
  );
};
export default LocationsCard;
const style = {
  pad: {
    padding: "4px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    cursor: "pointer",
  },
  cardText: {
    margin: "4px 0",
    fontWeight: 600,
    fontSize: "18px",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    border: "none",
  },
  modalContanier: {
    background: "white",
    height: { md: "600px", xs: "100%" },
    width: { md: "900px", xs: "100%" },
    borderRadius: "12px",
    padding: "12px",
    border: "1px solid white",
    cursor: "pointer",
    // border: "none",
  },
  modalInner: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  arrowContanier: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "start",
    width: "50%",
  },
  arrow: { cursor: "pointer", color: colors.primary },
  outletName: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "start",
    width: "100%",
  },
  ouletNameText: { fontSize: { sm: "22px", xs: "16px" }, fontWeight: 700 },
  outletContanier: {
    paddingX: "16px",
    paddingTop: "22px",
  },
  outletText: { color: colors.golden, fontSize: "20px", fontWeight: 500 },
  locationText: { fontSize: "18px", fontWeight: 400, paddingY: "16px" },
  buttonText: {
    color: colors.primary,
    border: `1px solid ${colors.primary}`,
    borderRadius: "5px",
    padingX: "16px",
    paddingY: "8px",
    fontWeight: 700,
    ":hover": {
      color: colors.primary,
      border: `1px solid ${colors.primary}`,
    },
  },
};

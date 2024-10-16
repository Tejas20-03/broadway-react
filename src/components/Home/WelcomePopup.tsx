import { Box, Modal } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { getWelcomePopup } from "@/services/Home/services";
import { WelcomePopupResponse } from "@/services/Home/types";

type Ipops = {
  open: boolean;
  onClose: () => void;
  data: WelcomePopupResponse;
};

const WelcomePopup: React.FC<Ipops> = ({ onClose, open, data }) => {
  return (
    <>
      <Modal sx={{}} open={open} onClose={onClose}>
        <Box sx={styles.contanier}>
          <ClearIcon sx={styles.icon} onClick={onClose} />
          <Box sx={styles.image}>
            {data && (
              <Image
                src={data ? data?.Data : ""}
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  width: "100%",
                  height: "100%",
                }}
                alt="oops"
                width={800}
                height={1000}
                priority={true}
              />
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default WelcomePopup;

const styles = {
  contanier: {
    width: "100%",
    height: "100%",
    display: "flex",

    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    position: "relative",
  },
  icon: {
    color: "white",
    fontSize: "40px",
    position: "absolute",
    right: "40px",
    top: "40px",
    zIndex: 99,
  },
  image: {
    border: "none",
    background: "black",
    height: "100%",
    //   width: "80%",
  },
};

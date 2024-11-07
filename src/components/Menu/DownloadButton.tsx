"use client";
import { colors } from "@/constant/Colors";
import { Button, CircularProgress } from "@mui/material";
import React, { useState } from "react";
const DownloadButton = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const downloadFile = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://services.broadwaypizza.com.pk/Menu.pdf",
        {
          method: "GET",
        }
      );

      const buffer = await response.arrayBuffer();
      const file = new Blob([buffer], { type: "application/pdf" });

      const url = URL.createObjectURL(file);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Menu.pdf");
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button sx={style.butn} onClick={downloadFile}>
      {loading ? (
        <CircularProgress
          size={25}
          sx={{
            color: colors.white,
          }}
        />
      ) : (
        "Download Menu"
      )}
    </Button>
  );
};
export default DownloadButton;

const style = {
  butn: {
    marginY: "15px",
    paddingY: "8px",
    width: { lg: "850px", md: "700px", sm: "500px", xs: "350px" },
    color: "#0ca353",
    fontWeight: 700,
    backgroundColor: colors.white,
    border: `2px solid #0ca353`,

    ":hover": {
      backgroundColor: colors.white,
      color: "#0ca353",
      border: `2px solid #0ca353`,
      boxShadow: 2,
    },
  },
};

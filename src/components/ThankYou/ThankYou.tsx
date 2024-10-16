"use client";
import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import Image from "next/image";
import logo from "../../../public/Assets/broadwayPizzaLogo.png";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { colors } from "@/constant/Colors";
import orderProceed from "../../../public/Assets/order-processed.png";
import orderNo from "../../../public/Assets/order-number.png";
import orderTime from "../../../public/Assets/approx-time.png";
import total from "../../../public/Assets/total.png";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { ResponseOrder } from "@/services/Cart/type";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "500", "400", "600", "700"],
});

function ThankYou() {
  const params = useSearchParams();
  const [data, setData] = useState<ResponseOrder>();

  useEffect(() => {
    const data = JSON.parse(`${params.get("data")}`);
    setData(data);
  }, []);
  return (
    <>
      <Box sx={style.main}>
        <Container sx={style.container}>
          <Image
            alt="ops"
            src={orderProceed}
            width={150}
            height={150}
            style={{ marginBottom: "14px" }}
          />
          <Typography
            className={poppins.className}
            sx={{ fontSize: "22px", fontWeight: 700 }}
          >
            Thank You {data && data.name}
          </Typography>
          <Typography className={poppins.className}>
            Your order has been placed
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItens: "center",
              paddingY: "14px",
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Image
                alt="ops"
                src={orderNo}
                width={50}
                height={50}
                style={{ marginBottom: "14px" }}
              />
              <Typography sx={{ fontWeight: 600 }}>Order</Typography>
              <Typography sx={{ fontWeight: 600 }}>
                {data ? data.OrderID : ""}
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Image
                alt="ops"
                src={orderTime}
                width={50}
                height={50}
                style={{ marginBottom: "14px" }}
              />
              <Typography sx={{ fontWeight: 600 }}>Approx.Min</Typography>
              <Typography sx={{ fontWeight: 600 }}>
                {data ? data.DeliveryTime : ""}
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Image
                alt="ops"
                src={total}
                width={50}
                height={50}
                style={{ marginBottom: "14px" }}
              />
              <Typography sx={{ fontWeight: 600 }}>Total</Typography>
              <Typography sx={{ fontWeight: 600 }}>
                Rs. {data ? data.OrderAmount : ""}
              </Typography>
            </Box>
          </Box>
          <Link
            style={{
              textDecoration: "none",
              listStyle: "none",
              color: "inherit",
            }}
            href={"/"}
          >
            <Button sx={style.butn} className={poppins.className}>
              Go Back To Home
            </Button>
          </Link>
        </Container>
      </Box>
    </>
  );
}

export default ThankYou;
const style = {
  main: {
    width: "100%",
    height: "100%",
    position: "relative",
    paddingBottom: { lg: "0px", xs: "6rem" },
  },
  container: {
    maxWidth: { xl: "1400px" },
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "Center",
  },
  butn: {
    width: "100%",
    marginY: "15px",
    paddingY: "8px",
    paddingX: "2rem",
    backgroundColor: colors.primary,
    color: colors.white,
    fontWeight: 700,
    boxShadow: 4,
    ":hover": {
      backgroundColor: colors.primary,
      color: colors.white,
      boxShadow: 6,
    },
  },
};

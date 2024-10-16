import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";

import { Poppins } from "next/font/google";
import Image from "next/image";
import GetAppFooter from "../Common/GetAppFooter";
import { getCitiesWithImage } from "@/services/location/services";
import LocationsCard from "./LocationsCard";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

async function Location() {
  const data = await getCitiesWithImage({});

  return (
    <>
      <Box sx={style.Box}>
        <Container sx={style.container}>
          <Grid container columnSpacing={5} rowSpacing={5}>
            <Grid item lg={4} xs={12}>
              <Typography
                sx={style.locationHeading}
                className={poppins.className}
              >
                Our Locations
              </Typography>
            </Grid>
            {/* <Grid container> */}
            {data.map((item, index) => {
              return (
                <LocationsCard
                  key={index}
                  Name={item.Name}
                  ImageURL={item.ImageURL}
                />
              );
            })}
          </Grid>
          {/* </Grid> */}
        </Container>
      </Box>
      <GetAppFooter />
    </>
  );
}

export default Location;

const style = {
  Box: {
    width: "100%",
    height: "100%",
    position: "relative",
    marginLeft: { md: "60px" },
  },
  container: {
    maxWidth: { lg: "1400px" },
    marginTop: "2rem",
  },
  locationHeading: {
    fontSize: "35px",
    fontWeight: 800,
    width: "100%",
    textAlign: "center",
    marginTop: { lg: "45px" },
  },
  pad: {
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  cardText: {
    margin: "10px 0",
    fontWeight: 600,
    fontSize: "18px",
  },
};

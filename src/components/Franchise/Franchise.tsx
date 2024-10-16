"use client";
import styled from "@emotion/styled";
import {
  Box,
  Button,
  Container,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { colors } from "@/constant/Colors";

import GetAppFooter from "../Common/GetAppFooter";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import EastIcon from "@mui/icons-material/East";
import { useState } from "react";
import { FranchiseApplicant } from "@/services/frenchise/types";
import { postFrenchiseData } from "@/services/frenchise/services";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "500", "400", "600", "700"],
});
const initialData = {
  firstName: "",
  contact: "",
  Email: "",
  occupation: "",
  city: "",
  own_other_franchises: "",
  own_property: "",
  hearAbout: "Select",
  totalLiquidAssets: "Select",
  regions: "",
};

export default function Franchise() {
  const [data, setData] = useState<FranchiseApplicant>(initialData);
  const [notifySuccess, setNotifySuccess] = useState<boolean>(false);
  const [notifyDanger, setNotifyDanger] = useState<boolean>(false);

  function validateEmail(email: string) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validatePakistaniPhoneNumber(phoneNumber: string) {
    var phoneRegex = /^(\+92)?(0)?(3[0-9]{9})$/;
    return phoneRegex.test(phoneNumber);
  }

  const handleSubmit = () => {
    if (
      data.firstName === "" ||
      data.contact === "" ||
      data.Email === "" ||
      data.occupation === "" ||
      data.city === "" ||
      data.own_other_franchises === "" ||
      data.own_property === "" ||
      data.hearAbout === "Select" ||
      data.totalLiquidAssets === "Select" ||
      (data.regions === "" &&
        validateEmail(data.Email) &&
        validatePakistaniPhoneNumber(data.contact))
    ) {
      setNotifyDanger(true);
      return;
    } else {
      postFrenchiseData(data, {})
        .then((res) => {
          if (res && res?.responseType === 1) {
            //Sucessfull
            setData(initialData);
          }
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setNotifySuccess(true);
        });
    }
  };
  return (
    <>
      <Box sx={style.main}>
        <Container sx={style.container}>
          <Typography sx={style.heading} className={poppins.className}>
            Become a Broadway Franchise Partner
          </Typography>
          <Box sx={style.frenchiseBox} className="frenchise">
            <label className={`input-b ${poppins.className}`}>
              <span>Your Name (*)</span>
              <input
                type="text"
                placeholder="Type your name here"
                required
                className="input-invalid"
                onChange={(e) =>
                  setData({ ...data, firstName: e.target.value })
                }
                value={data.firstName}
              />
            </label>
            <label className={`input-b ${poppins.className}`}>
              <span>Your Phone (*)</span>
              <input
                type="text"
                placeholder="Type your number here"
                required
                className="input-invalid"
                onChange={(e) => setData({ ...data, contact: e.target.value })}
                value={data.contact}
              />
            </label>
            <label className={`input-b ${poppins.className}`}>
              <span>Your Email (*)</span>
              <input
                type="text"
                placeholder="Type your email address"
                required
                className="input-invalid"
                onChange={(e) => setData({ ...data, Email: e.target.value })}
                value={data.Email}
              />
            </label>
            <label className={`input-b ${poppins.className}`}>
              <span>What is your current occupation? (*)</span>
              <input
                type="text"
                placeholder="Type your ocupation name here"
                required
                className="input-invalid"
                onChange={(e) =>
                  setData({ ...data, occupation: e.target.value })
                }
                value={data.occupation}
              />
            </label>
            <label className={`input-b ${poppins.className}`}>
              <span>
                Which city/town you are interested in opening the franchise? (*)
              </span>
              <input
                type="text"
                placeholder="Type city here "
                required
                className="input-invalid"
                onChange={(e) => setData({ ...data, city: e.target.value })}
                value={data.city}
              />
            </label>
            <label className={`input-b ${poppins.className}`}>
              <span>
                Do you own any other franchise? (If yes then specify the name)
                (*)
              </span>
              <input
                type="text"
                placeholder="yes / no"
                required
                className="input-invalid"
                onChange={(e) =>
                  setData({ ...data, own_other_franchises: e.target.value })
                }
                value={data.own_other_franchises}
              />
            </label>
            <label className={` ${poppins.className}`}>
              <span>
                Do you own the property where you are interested in opening the
                franchise? (*){" "}
              </span>{" "}
              <br />
              <input
                type="radio"
                name="own_property"
                className="radioBtn1"
                onChange={(e) => {
                  setData({ ...data, own_property: "Yes" });
                }}
                value={data.own_property}
              />
              Yes <br />
              <input
                type="radio"
                name="own_property"
                className="radioBtn2"
                onChange={(e) => setData({ ...data, own_property: "No" })}
                value={data.own_property}
              />
              No <br />
            </label>
            <label className={`input-b ${poppins.className}`}>
              <span>Where did you hear about us? (*)</span>
              <Select
                label="Select"
                sx={{
                  width: "100%",
                  display: "block",

                  border: "solid 2px #000",
                  marginTop: "7px",
                  background: "#ffffff0a",
                  borderRadius: "6px",
                  color: "#3e3e3e",
                  marginBottom: { sm: "0px", xs: "15px" },
                }}
                onChange={(e) =>
                  setData({ ...data, hearAbout: e.target.value })
                }
                value={data.hearAbout}
              >
                <MenuItem value={"Facebook"}>Facebook</MenuItem>
                <MenuItem value={"Instagram"}>Instagram</MenuItem>
                <MenuItem value={"Relative"}>Relative</MenuItem>
                <MenuItem value={"Restaraunt"}>Restaraunt</MenuItem>
                <MenuItem value={"website"}>website</MenuItem>
              </Select>
            </label>
            <label className={`input-b ${poppins.className}`}>
              <span>
                How much capital can you invest to open the franchise? (*)
              </span>{" "}
              <Select
                label="PKR 1000,000"
                sx={{
                  width: "100%",
                  display: "block",

                  border: "solid 2px #000",
                  marginTop: "7px",
                  background: "#ffffff0a",
                  borderRadius: "6px",
                  color: "#3e3e3e",
                  marginBottom: { sm: "0px", xs: "15px" },
                }}
                onChange={(e) =>
                  setData({ ...data, totalLiquidAssets: e.target.value })
                }
                value={data.totalLiquidAssets}
              >
                <MenuItem value={"PRK 20 million"}>PRK 20 million</MenuItem>
                <MenuItem value={"PRK 25 million"}>PRK 25 million</MenuItem>
                <MenuItem value={"PRK 30 million"}>PRK 30 million</MenuItem>
                <MenuItem value={"PRK 35 million"}>PRK 35 million</MenuItem>
                <MenuItem value={"PRK 40 million"}>PRK 40 million</MenuItem>
                <MenuItem value={"PRK 45 million"}>PRK 45 million</MenuItem>
              </Select>
            </label>
            <label className={`input-b ${poppins.className}`}>
              <span>Your office address(*)</span>
              <input
                type="text"
                placeholder="Type your office address here"
                required
                className="input-invalid"
                onChange={(e) => setData({ ...data, regions: e.target.value })}
                value={data.regions}
              />
            </label>
          </Box>
          <Box sx={style.last}>
            {/* <Typography className={poppins.className}>
              <span style={{ color: colors.red }}>Note :</span>This is not a job
              submission form!
            </Typography> */}
            <Button sx={style.btn} onClick={() => handleSubmit()}>
              SEND <EastIcon />
            </Button>
          </Box>
        </Container>
      </Box>
      <GetAppFooter />
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={notifySuccess}
        onClose={() => setNotifySuccess(false)}
        // key={"addtocart"}
        autoHideDuration={2000}
        sx={{
          marginBottom: { xs: 10, lg: 20 },
        }}
      >
        <Alert
          onClose={() => setNotifySuccess(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Form Submitted Successfully
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={notifyDanger}
        onClose={() => setNotifyDanger(false)}
        // key={"addtocart"}
        autoHideDuration={2000}
        sx={{
          marginBottom: { xs: 10, lg: 20 },
        }}
      >
        <Alert
          onClose={() => setNotifyDanger(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Fill all the feilds
        </Alert>
      </Snackbar>
    </>
  );
}

const style = {
  main: {
    width: "100%",
    height: "100%",
    position: "relative",
    marginBottom: "16px",
  },
  container: {
    maxWidth: { xl: "1240px" },
  },
  heading: {
    width: "100%",
    textAlign: "center",
    fontWeight: 800,
    fontSize: "30px",
    marginY: "25px",
  },
  frenchiseBox: {
    width: "100%",
    display: { sm: "flex", xs: "block" },
    flexWrap: "wrap",
  },
  btn: {
    color: colors.white,
    background: colors.red,
    paddingY: "10px",
    paddingX: "4rem",
    marginTop: "12px",
    ":hover": {
      color: colors.white,
      background: colors.red,
    },
  },
  last: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "60px",
  },
};

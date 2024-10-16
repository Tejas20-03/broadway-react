"use client";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Snackbar,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { colors } from "@/constant/Colors";
import Link from "next/link";
import GetAppFooter from "../Common/GetAppFooter";
import { useState } from "react";
import { ContactType } from "@/services/Contact/types";
import { addContact } from "@/services/Contact/services";
import CateringInput from "./CateringInput";
import { cateringEvent } from "@/services/Challange/services";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "500", "400", "600", "700"],
});

const initialData = {
  Name: "",
  Email: "",
  Phone: "",
  NoofPerson: "",
  Date: "",
  Time: "",
  Location: "",
  Instructions: "",
};
const initialError = {
  errorName: "",
  errorPhone: "",
  errorRemarks: "",
  errorEmail: "",
  errorNumberOfperson: "",
  errorEventDate: "",
  errorEventTime: "",
  errorEventLocation: "",
  errorSpecialInstruction: "",
};
export default function Catering() {
  const [error, setError] = useState(initialError);
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  const theme = useTheme();
  const handleSubmit = () => {
    console.log(data);
    setLoading(true);
    cateringEvent(data, {})
      .then((res) => {
        if (res) {
          setData(initialData);
          setError(initialError);
          setOpenSnackbar(true);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  const handleChange = (name: string, value: string) => {
    setData({
      ...data,
      [name]: value,
    });
  };
  const downloadFile = async () => {
    try {
      const response = await fetch(
        "https://services.broadwaypizza.com.pk/CateringMenu.pdf",
        {
          method: "GET",
        }
      );

      const buffer = await response.arrayBuffer();
      const file = new Blob([buffer], { type: "application/pdf" });

      const url = URL.createObjectURL(file);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "CateringMenu.pdf");
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    } finally {
    }
  };
  const links = { color: colors.primary, textDecoration: "none" };
  return (
    <>
      <Box sx={style.main}>
        <Container sx={style.container}>
          <Box sx={style.contactBoxTop}>
            <Typography sx={style.heading} className={poppins.className}>
              CATERING
            </Typography>
            <Typography sx={style.para} className={poppins.className}>
              Indulge in the exceptional catering experience brought to you by
              Broadway's Pizza on Wheels. Elevate your event with our
              full-service catering, perfect for intimate family gatherings of
              30 or grand celebrations hosting 300+ guests, including birthday
              parties, baby showers, bridal showers, Mehndi, Mayon, and more.
              Our tailored menus are designed exclusively for your occasion,
              ensuring a unique culinary experience. For added convenience, we
              offer pick-up services as well. Contact us at 111-339-339 or
              03011136804 to explore the full spectrum of our catering services.
            </Typography>
            <CateringInput
              value={data.Name}
              onChange={(e) => handleChange("Name", e.target.value)}
              heading="Full Name"
              errorText={error.errorName}
            />
            <CateringInput
              value={data.Phone}
              onChange={(e) => handleChange("Phone", e.target.value)}
              heading="Mobile"
              errorText={error.errorPhone}
            />
            <CateringInput
              value={data.Email}
              onChange={(e) => handleChange("Email", e.target.value)}
              heading="EMAIL ADDRESS"
              errorText={error.errorEmail}
            />
            <CateringInput
              value={data.NoofPerson}
              onChange={(e) => handleChange("NoofPerson", e.target.value)}
              heading="NUMBER OF PERSONS"
              errorText={error.errorNumberOfperson}
            />
            <CateringInput
              value={data.Date}
              onChange={(e) => handleChange("Date", e.target.value)}
              heading="EVENT DATE"
              errorText={error.errorEventDate}
              type="date"
            />
            <CateringInput
              value={data.Time}
              onChange={(e) => handleChange("Time", e.target.value)}
              heading="EVENT TIME"
              errorText={error.errorEventTime}
              type="time"
            />
            <CateringInput
              value={data.Location}
              onChange={(e) => handleChange("Location", e.target.value)}
              heading="EVENT LOCATION"
              errorText={error.errorEventLocation}
            />
            <label className={`input-b ${poppins.className}`}>
              <span>SPECIAL INSTRUCTIONS: (optional)</span>
              <input
                type={"text"}
                placeholder="SPECIAL INSTRUCTIONS"
                required
                className="input-invalid"
                onChange={(e) => handleChange("Instructions", e.target.value)}
                value={data.Instructions}
                multiple={true}
              />
            </label>

            <Button
              variant="contained"
              className={poppins.className}
              sx={style.btn}
              onClick={() => handleSubmit()}
            >
              {loading ? (
                <CircularProgress color="inherit" />
              ) : (
                <Typography className={poppins.className} sx={style.Download}>
                  Submit
                </Typography>
              )}
            </Button>
            <Button
              variant="contained"
              className={poppins.className}
              sx={style.btn}
              onClick={() => downloadFile()}
            >
              <Typography className={poppins.className} sx={style.Download}>
                Download Catering Menu
              </Typography>
            </Button>
          </Box>
        </Container>
      </Box>
      <GetAppFooter />
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        key={"addtocart"}
        autoHideDuration={2000}
        sx={{
          marginBottom: { xs: 10, lg: 20 },
        }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Request Submitted!
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
  },
  container: {
    maxWidth: { xl: "1240px" },
  },
  contactBoxTop: {
    background: colors.background,
    // boxShadow: "1px 1px 5px #0000001c",
    padding: "16px",
    width: "100%",
    margin: "1em 0",
    borderRadius: "10px",
  },
  heading: {
    width: "100%",
    textAlign: "center",
    fontWeight: 600,
    fontSize: "30px",
    marginY: "10px",
  },
  btn: {
    width: "100%",
    fontWeight: 500,
    color: colors.white,
    background: colors.primary,
    marginY: "10px",
    paddingY: "8px",
    ":hover": { background: colors.primary },
    fontSize: "20px",
  },
  pizzaheading: {
    fontWeight: 600,
    fontSize: "17px",
    marginY: "12px",
  },
  contactDetails: {
    marginY: "1em",
  },
  para: {
    width: "100%",
    textAlign: "center",
    fontWeight: 400,
    fontSize: "16px",
    marginY: "10px",
  },
  Download: {
    fontSize: { lg: "14px", xs: "12px" },
  },
};

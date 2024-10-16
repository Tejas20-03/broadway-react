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
import { Poppins } from "next/font/google";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { colors } from "@/constant/Colors";
import Link from "next/link";
import GetAppFooter from "../Common/GetAppFooter";
import { useState } from "react";
import { ContactType } from "@/services/Contact/types";
import { addContact } from "@/services/Contact/services";
import CateringInput from "../Catering/CateringInput";
import { cateringEvent, corporateEvent } from "@/services/Challange/services";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "500", "400", "600", "700"],
});

const initialData = {
  Name: "",
  Organization: "",
  Email: "",
  Phone: "",
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
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const handleSubmit = () => {
    setLoading(true);

    corporateEvent(data, {})
      .then((res) => {
        console.log(res);
        if (res) {
          setData(initialData);
          setError(initialError);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  const downloadFile = async () => {
    try {
      const response = await fetch(
        "https://services.broadwaypizza.com.pk/CorporateMenu.pdf",
        {
          method: "GET",
        }
      );

      const buffer = await response.arrayBuffer();
      const file = new Blob([buffer], { type: "application/pdf" });

      const url = URL.createObjectURL(file);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "CorporateMenu.pdf");
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    } finally {
    }
  };
  const handleChange = (name: string, value: string) => {
    setData({
      ...data,
      [name]: value,
    });
  };
  const links = { color: colors.primary, textDecoration: "none" };
  return (
    <>
      <Box sx={style.main}>
        <Container sx={style.container}>
          <Box sx={style.contactBoxTop}>
            <Typography sx={style.heading} className={poppins.className}>
              CORPORATE ALLIANCES
            </Typography>
            <Typography sx={style.para} className={poppins.className}>
              The Broadway Pizza is excited to introduce our exclusive Prepaid
              Gift Voucher Program, designed specifically to meet the
              requirements of our esteemed corporate partners. Our program
              offers versatile Prepaid Gift Vouchers that corporate clients can
              present to their employees as a gesture of gratitude or to their
              valued customers as a premium corporate gift.
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
              value={data.Organization}
              onChange={(e) => handleChange("Organization", e.target.value)}
              heading="Organization"
              errorText={error.errorNumberOfperson}
            />
            <label className={`input-b ${poppins.className}`}>
              <span>QUERY BOX</span>
              <input
                type={"text"}
                placeholder="Type your query here"
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
                <Typography
                  className={poppins.className}
                  sx={{ fontSize: { lg: "14px", xs: "12px" } }}
                >
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
              <Typography
                className={poppins.className}
                sx={{ fontSize: { lg: "14px", xs: "12px" } }}
              >
                Corporate Proposal Download
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
};

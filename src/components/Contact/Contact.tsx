"use client";
import { Box, Button, Container, Typography } from "@mui/material";
import { Poppins } from "next/font/google";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { colors } from "@/constant/Colors";
import Link from "next/link";
import GetAppFooter from "../Common/GetAppFooter";
import { useState } from "react";
import { ContactType } from "@/services/Contact/types";
import { addContact } from "@/services/Contact/services";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "500", "400", "600", "700"],
});

function validateInput(value: string) {
  const validPrefixes = ["+92", "03"];

  if (value.length > 16) {
    return "Input should not exceed 16 characters.";
  }

  const isValidPrefix = validPrefixes.some((prefix) =>
    value.startsWith(prefix)
  );

  if (!isValidPrefix) {
    return "Input should start with '+92' or '03'.";
  }

  // Input is valid
  return "Valid Phone";
}
function validateName(name: string) {
  // Check if the name contains only alphabetic characters
  const nameRegex = /^[A-Za-z]+$/;
  if (!nameRegex.test(name)) {
    return "Name should contain only alphabetic characters.";
  }

  // Name is valid
  return "Valid Name";
}

export default function Contact() {
  const [errorName, setErrorName] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState({
    Name: "",
    Phone: "",
    Remarks: "",
  });

  const handleSubmit = () => {
    const errorName = validateName(data.Name);
    setErrorName(errorName);
    const errorPhone = validateInput(data.Phone);
    setError(errorPhone);
    let isError = false;
    if (
      data.Name === "" ||
      data.Phone === "" ||
      error !== "Valid Phone" ||
      errorName !== "Valid Name" ||
      data.Remarks === ""
    ) {
      isError = true;
    } else {
      console.log("run");

      addContact(data, {})
        .then((res) => {
          if (res && res.responseType === 1) {
            setData({
              Name: "",
              Phone: "",
              Remarks: "",
            });
            setError("");
            setErrorName("");
          }
        })
        .catch((err) => console.log(err))
        .finally(() => {});
    }
  };
  const links = {
    color: colors.black,
    textDecoration: "none",
    fontWeight: "bold",
  };
  return (
    <>
      <Box sx={style.main}>
        <Container sx={style.container}>
          <Typography sx={style.heading} className={poppins.className}>
            Contact us
          </Typography>
          <Box sx={style.contactBoxTop}>
            <label className={`input-b ${poppins.className}`}>
              <span>Full Name (*)</span>
              <input
                type="text"
                name="name"
                className="input-invalid"
                placeholder="Type your name here"
                onChange={(e) => setData({ ...data, Name: e.target.value })}
                value={data.Name}
              />
            </label>
            {errorName !== "Valid Name" && errorName !== "" ? (
              <Typography sx={{ color: "red" }}>*{errorName}</Typography>
            ) : (
              ""
            )}
            <label className={`input-b ${poppins.className}`}>
              <span>Your Phone (*)</span>
              <input
                type="text"
                name="name"
                className="input-invalid"
                placeholder="Type your number here"
                onChange={(e) => setData({ ...data, Phone: e.target.value })}
                value={data.Phone}
              />
            </label>
            {error !== "Valid Phone" && error !== "" ? (
              <Typography sx={{ color: "red" }}>*{error}</Typography>
            ) : (
              ""
            )}
            <label className={`input-b ${poppins.className}`}>
              <span>Your Message (*)</span>
              <input
                type="text"
                name="name"
                className="input-invalid"
                placeholder="Type your message here"
                onChange={(e) => setData({ ...data, Remarks: e.target.value })}
                value={data.Remarks}
              />
            </label>

            <Button
              variant="contained"
              className={poppins.className}
              sx={style.btn}
              onClick={() => handleSubmit()}
            >
              SEND YOUR MESSAGE <ArrowForwardIcon />
            </Button>
          </Box>
          <Box sx={style.contactBoxTop}>
            <Typography sx={style.pizzaheading} className={poppins.className}>
              Broadway Pizza Pakistan
            </Typography>
            <Typography sx={style.contactDetails}>
              <b>UAN</b>{" "}
              <a style={links} href="tel:021111133933">
                +92 21 111 339 339
              </a>
              <br />
              <b>Whatsapp</b>{" "}
              <a style={links} href="tel:021111133933">
                +92 21 111 339 339
              </a>
            </Typography>
            <Typography className={poppins.className} sx={style.contactDetails}>
              For any <b>General query</b> email us at:{" "}
              <Link href={"info@broadwaypizza.com.pk"} style={links}>
                info@broadwaypizza.com.pk
              </Link>
            </Typography>
            <Typography className={poppins.className} sx={style.contactDetails}>
              For any <b>franchise query</b> email us at:{" "}
              <Link href={"franchise@broadwaypizza.com.pk"} style={links}>
                franchise@broadwaypizza.com.pk
              </Link>
            </Typography>
            <Typography className={poppins.className} sx={style.contactDetails}>
              For any <b>marketing query</b> email us at:{" "}
              <Link href={"marketing@broadwaypizza.com.pk"} style={links}>
                marketing@broadwaypizza.com.pk
              </Link>
            </Typography>
          </Box>
        </Container>
      </Box>
      <GetAppFooter />
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
    border: "1px solid #ccc",
    background: "#fcfcfc",
    boxShadow: "1px 1px 5px #0000001c",
    padding: "16px",
    width: "100%",
    margin: "1em 0",
  },
  heading: {
    width: "100%",
    textAlign: "center",
    fontWeight: 600,
    fontSize: "21px",
    marginY: "10px",
  },
  btn: {
    width: "100%",
    fontWeight: 500,
    color: colors.black,
    background: colors.primary,
    marginY: "10px",
    paddingY: "8px",
    ":hover": { background: colors.primary },
  },
  pizzaheading: {
    fontWeight: 600,
    fontSize: "17px",
    marginY: "12px",
  },
  contactDetails: {
    marginY: "1em",
  },
};

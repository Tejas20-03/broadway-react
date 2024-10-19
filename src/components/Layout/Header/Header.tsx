"use client";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  styled,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../../../../public/Assets/broadwayPizzaLogo.png";
import headerImage from "../../../../public/Assets/headerBroadwayImage.jpg";
import { colors } from "../../../constant/Colors";
import { Poppins } from "next/font/google";
import Location from "../../../../public/Assets/location.svg";
import WestIcon from "@mui/icons-material/West";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ModbileScreenInput from "./MobileScreenInput";
import Link from "next/link";
import List from "@mui/material/List";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { StoreDispatch, StoreState } from "@/redux/reduxStore";
import { cartActions, cartSliceIntialState } from "@/redux/cart/slice";
import HeaderStrip from "./HeaderStripe";
import DeliveryDialog from "./DeliveryDialog";
import FeedBackDialog from "./FeedBackDialog";
import { addressesActions } from "@/redux/address/slice";
import { getFeedbackOutlet } from "@/services/Feedback/services";
import { error } from "console";
import { AllOutletsResponseType } from "@/services/Feedback/types";
import { TiLocationArrowOutline } from "react-icons/ti";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "700"],
});
const Header: React.FC = () => {
  const router = useRouter();
  const addressData = useSelector((state: StoreState) => state.address);
  const dispatch = useDispatch<StoreDispatch>();

  const [showModelCity, setShowModelCity] = React.useState(false);
  const [OutletsearchValue, setOutletSearchValue] = useState<string>("");

  const toggleDrawer = (newOpen: boolean) => {
    dispatch(addressesActions.setAddresses({ modalOpen: newOpen }));
  };

  const [fvalue, setFValue] = React.useState("Select");
  const [outlet, setOutlet] = React.useState(false);
  const [openFeedback, setSetopenFeedback] = React.useState(false);
  const [FeedbackoutValue, setFeedbackoutValue] = React.useState(false);
  const [outlets, setOutlets] = useState<AllOutletsResponseType["Data"]>([]);

  const [scrollPosition, setScrollPosition] = useState(0);

  const showModelCityFun = (val: boolean) => {
    setShowModelCity(val);
  };
  const showFeedbackOutelt = (val: boolean) => {
    if (val)
      getFeedbackOutlet({})
        .then((data) => {
          console.log(data);
          if (data) setOutlets(data?.Data);
        })
        .catch((err) => console.log(err));

    setFeedbackoutValue(val);
  };
  const showModelCityFun1 = (val: boolean) => {
    setShowModelCity(val);
  };
  const openFeedbackDialog = (val: boolean) => {
    setSetopenFeedback(val);
  };

  const showModelOutletFun = (val: boolean) => {
    setOutlet(val);
  };

  const handleChangeOutF = (event: React.ChangeEvent<HTMLInputElement>) => {
    const data = JSON.parse((event.target as HTMLInputElement).value);
    setFValue(data.Name);
    window.open(
      `https://feedback.broadwaypizza.com.pk/feedbackorder.html?OutletID=${data.Id}`,
      "_blank"
    );
    setFeedbackoutValue(false);
  };

  const redirectToHome = () => {
    router.push("/");
  };
  const handleOutletSearch = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // let searchVal = event.target.value;
    setOutletSearchValue(event.target.value);
  };
  useEffect(() => {
    const setCartFromLocalStorage = () => {
      const cartData = window.localStorage.getItem("cartData");
      const addressData = window.localStorage.getItem("address");

      if (cartData) dispatch(cartActions.setCart(JSON.parse(cartData)));
      if (addressData)
        dispatch(addressesActions.setAddresses(JSON.parse(addressData)));
    };
    setCartFromLocalStorage();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Box
        sx={{
          ...style.main,
          height: "54px", // Add this line
          backgroundColor: `rgba(255, 255, 255, ${Math.min(
            scrollPosition / 400,
            0.9
          )})`,
        }}
      >
        <Container sx={style.container}>
          <Box sx={style.header}>
            <Image
              alt="main-logo"
              src={logo}
              fill={false}
              width={120}
              height={50}
              style={{ cursor: "pointer" }}
              onClick={redirectToHome}
            />
            <Box
              sx={style.headerLocationBox}
              onClick={() => toggleDrawer(true)}
            >
              <Box sx={style.locationInfo}>
                <TiLocationArrowOutline />
                <Typography
                  sx={style.selectedOption}
                  className={poppins.className}
                >
                  {addressData.addressType ? addressData.addressType : "Select"}
                </Typography>
              </Box>
              <Box sx={style.addressType}>
                <Typography sx={style.location} className={poppins.className}>
                  {addressData.city ? addressData.city : ""}{" "}
                  {addressData.area || addressData.outlet || "Delivery/Pickup"}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
        <HeaderStrip openFeedbackDialog={openFeedbackDialog} />
      </Box>
      <ModbileScreenInput openFeedbackDialog={openFeedbackDialog} />

      {addressData.modalOpen && (
        <DeliveryDialog
          outlet={outlet}
          handleChange={(city, tax) => {
            dispatch(
              addressesActions.setAddresses({
                city: city,
                outlet: "",
                area: "",
                tax: tax,
              })
            );
            showModelCityFun(false);
            showModelCityFun1(false);
          }}
          handleChangeOut={(e) => {
            dispatch(
              addressesActions.setAddresses({
                outlet: e.target.value,
                area: "",
              })
            );
            dispatch(cartActions.setCart(cartSliceIntialState));

            showModelOutletFun(false);
          }}
          showModelCityFun={showModelCityFun}
          showModelCityFun1={showModelCityFun1}
          showModelOutletFun={showModelOutletFun}
          showOption={addressData.addressType ? addressData.addressType : ""}
          setShowOption={(e) =>
            dispatch(
              addressesActions.setAddresses({
                addressType: e,
                area: "",
                outlet: "",
                city: "",
              })
            )
          }
          showModelCity={showModelCity}
          open={addressData.modalOpen}
          toggleDrawer={toggleDrawer}
          value={addressData.city ? addressData.city : ""}
          outValue={addressData.outlet ? addressData.outlet : ""}
          area={addressData.area ? addressData.area : ""}
          handleChangeArea={(e) => {
            dispatch(
              addressesActions.setAddresses({
                area: e.target.value,
                outlet: "",
              })
            );
            dispatch(cartActions.setCart(cartSliceIntialState));
            window.localStorage.setItem("address", JSON.stringify(addressData));
          }}
        />
      )}
      {openFeedback && (
        <>
          <FeedBackDialog
            openFeedback={openFeedback}
            openFeedbackDialog={openFeedbackDialog}
            showFeedbackOutelt={showFeedbackOutelt}
            fvalue={fvalue}
          />
        </>
      )}
      {FeedbackoutValue && (
        <>
          <Dialog
            onClose={() => showFeedbackOutelt(false)}
            open={FeedbackoutValue}
            sx={{ height: "100%" }}
            fullScreen={window.innerWidth < 570}
          >
            <List sx={{ pt: 0, width: { sm: "600px", xs: "100%" } }}>
              <Box sx={style.backButton}>
                <Button
                  sx={style.btn}
                  onClick={() => showFeedbackOutelt(false)}
                >
                  <WestIcon sx={{ color: colors.primary }} />
                </Button>
              </Box>
              <Box sx={style.headingBox}>
                <Typography sx={style.head1}>Select outlet</Typography>
              </Box>
              <Paper
                component="form"
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <IconButton sx={{ p: "10px" }} aria-label="menu">
                  <SearchIcon />
                </IconButton>
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search Outlet"
                  inputProps={{ "aria-label": "search google maps" }}
                  value={OutletsearchValue}
                  onChange={(e) => handleOutletSearch(e)}
                />
              </Paper>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={fvalue}
                onChange={handleChangeOutF}
                sx={{
                  padding: "2rem",
                  height: "500px",
                  overflowY: "scroll",
                  flexWrap: "nowrap !important",
                }}
              >
                {outlets &&
                  outlets
                    ?.filter((item) =>
                      item.City.toLowerCase().includes(
                        OutletsearchValue.toLowerCase()
                      )
                    )
                    .map((data, index) => (
                      <Box key={index}>
                        <FormControlLabel
                          className={poppins.className}
                          sx={{ fontSize: "1rem" }}
                          value={JSON.stringify(data)}
                          control={<Radio />}
                          label={data.Name}
                        />
                        <Divider />
                      </Box>
                    ))}
              </RadioGroup>
            </List>
          </Dialog>
        </>
      )}
    </>
  );
};

export default Header;
const style = {
  main: {
    width: "100%",
    position: "sticky",
    top: 0,
    zIndex: 100,
    transition: "background-color 0.1s ease",
  },
  mainMob: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },

  container: {
    maxWidth: { lg: "1400px", md: "950px" },
  },
  header: {
    width: "100%",
    padding: { md: "0.5rem", xs: "0px" }, // Reduced from 1rem to 0.5rem
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: "5px !important", // Reduced from 10px to 5px
  },
  searchBoxMob: {
    width: "100%",
    padding: "1rem",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
  },
  headerLocationBox: {
    cursor: "pointer",
    display: "flex",
    flexDirection: "row",
    gap: "0.5rem",
    alignItems: "center",
  },
  locationInfo: {
    fontWeight: 200,
    display: "flex",
    flexDirection: "row",
  },
  selectedOption: {
    fontWeight: 200,
    fontSize: { xs: "0.7rem", sm: "0.8rem" },
  },
  locationText: {
    display: "flex",
    flexDirection: "row",
    fontStyle: "light",
    fontSize: "13px",
    lineHeight: "16px",
    alignItems: "center",
    gap: "0.5rem",
  },
  addressType: {
    backgroundColor: colors.primary,
    color: colors.black,
    padding: { xs: "0.2rem 0.4rem", sm: "0.25rem 0.5rem" },
    borderRadius: "4px",
    fontSize: { xs: "0.7rem", sm: "0.8rem" },
    fontWeight: 500,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "0.3rem",
  },
  
  dilveryTo: {
    color: colors.black,
    fontSize: "0.9rem",
    fontStyle: "bold",
  },
  iconColor: {
    color: colors.primary,
    width: "2em",
    height: "2em",
  },
  location: {
    color: colors.black,
    fontSize: { xs: "0.7rem", sm: "0.8rem" },
  },
  inputStyle: {
    "::before": { borderBottom: "0px !important" },
    border: "0px solid rgba(0,0,0,0.42)",
    borderRadius: "10px",
    width: "100%",
    paddingY: "0.5rem",
    fontSize: "12px",
    paddingX: "16px",
    "::after": { borderBottom: "0px !important" },
    backgroundColor: colors.white,
  },
  mobNavBar: {
    position: "fixed",
    bottom: 10,
    zIndex: 999,
    left: 0,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    transition: "bottom 0.3s ease",
    height: "62px",
    alignItems: "center",
  },
  subContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginX: "0.5rem",
    backgroundColor: "#252E1C",
    borderRadius: "20rem",
    padding: "0.5rem",
    filter: "drop-shadow(0px 8px 8px rgba(0, 0, 0, 0.25))",
  },
  fixed: {
    bottom: 30,
  },
  iconStyle: {
    height: "35px",
    width: "35px",
    display: "flex",
    alignItems: "Center",
    justifyContent: "center",
    borderRadius: "50%",
    backgroundColor: "#252E1C",
  },
  backButton: {
    position: "absolute",
    top: 15,
    left: 15,
  },
  btn: {
    fontWeight: 700,
    color: colors.primary,
  },
  headingBox: {
    width: "100%",
    textAlign: "center",
  },
  head: {
    paddingY: "1rem",
    fontSize: "25px",
    fontWeight: 600,
    textAlign: "right",
  },
  head1: {
    paddingY: "1rem",
    fontSize: "25px",
    fontWeight: 600,
  },
  lowerPart: {
    width: "100%",
    padding: "2rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  takeAway: {
    width: "100%",
    height: "100px",
    display: "flex",
    flexDirection: "row",
    gap: "1rem",
    alignItems: "center",
    justifyContent: "center",
    border: "solid 1px #e2e2e2",
    borderRadius: "10px",
    paddingY: "0.5rem",
    marginX: "1rem",
  },
  boldTex: {
    color: colors.primary,
    fontWeight: 600,
    fontSize: "1.3rem",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  selectCityBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem",
  },
  outvals: {
    cursor: "pointer",
    fontSize: "0.8rem", // Reduced from 0.9rem
    fontWeight: 400,
  },
  iconStyles: {
    color: colors.white,
    fontSize: "2rem",
  },
  out: {
    background: colors.primary,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    paddingY: "1rem",
  },
  showMenu: {
    fontSize: "2rem",
    color: "white",
    fontWeight: 700,
    cursor: "pointer",
  },
  boxDialog: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "15px",
    paddingX: "16px",
  },
  dialogCard: {
    display: "block",
    /* box-shadow: 2px 5px 9px #00000014; */
    marginY: "25px",
    borderRadius: "8px",
    position: "relative",
    padding: "17px 0 17px 5%",
    textAlign: "left",
    textTransform: "uppercase",
    background: "#ffffff17",
    overflow: "hidden",
    color: colors.black, // Assuming --main-color is your primary color variable
    fontWeight: 900,
    width: "100%",
  },
  actives: {
    color: colors.primary,
    boxShadow: "4px 7px 25px #00000026",
    zIndex: 2,
  },
  showOptions: {
    fontWeight: 700,
    color: colors.black,
    opacity: 0.3,
    paddingY: "24px",
    width: "100%",
  },
  newAdd: {
    marginLeft: "1.5rem",
    background: colors.primary,
    color: colors.white,
    width: "90%",
    paddinY: "10px",
    fontWeight: 700,
    marginTop: "15px",
    marginBottom: "4rem",
    boxShadow: 4,
    ":hover": { background: colors.primary },
  },
  newAdd1: {
    marginLeft: "1.5rem",
    background: colors.primary,
    color: colors.white,
    width: "90%",
    paddinY: "10px",
    fontWeight: 700,
    marginTop: "15px",
    boxShadow: 4,
    ":hover": { background: colors.primary },
  },
  tick: {
    position: "absolute",
    bottom: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  tickBox: {
    width: "50px",
    height: "50px",
    color: "white",
    background: "#00A700",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    boxShadow: 5,
    cursor: "pointer",
    zIndex: 99,
  },
  tickBox1: {
    width: "50px",
    height: "50px",
    color: "white",
    background: colors.grey,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    boxShadow: 5,
    cursor: "pointer",
    zIndex: 99,
  },

  rad: {
    width: "100%",
    padding: "1rem",
    display: "flex",
    flexDirection: "row",
    gap: "16px",
  },
  overfloeDots: {
    maxWidth: { xs: "100px", md: "100%" },
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: { xs: "nowrap", md: "wrap" },
  },
};

import {
  Box,
  Button,
  Dialog,
  IconButton,
  InputBase,
  List,
  Paper,
  Typography,
} from "@mui/material";
import { Poppins } from "next/font/google";
import React from "react";
import WestIcon from "@mui/icons-material/West";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { colors } from "@/constant/Colors";

type IProps = {
  openFeedbackDialog: (value: boolean) => void;
  openFeedback: boolean;
  showFeedbackOutelt: (value: boolean) => void;
  fvalue: string;
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
});
const FeedBackDialog: React.FunctionComponent<IProps> = ({
  openFeedbackDialog,
  openFeedback,
  showFeedbackOutelt,
  fvalue,
}) => {
  return (
    <Dialog
      onClose={() => openFeedbackDialog(false)}
      open={openFeedback}
      sx={{ height: "100vh" }}
      fullScreen={window.innerWidth < 570}
    >
      <List
        sx={{
          pt: 0,
          width: { xs: "100%", lg: "600px" },
          height: { xs: "100vh", lg: "500px" },
          overflow: "hidden",
        }}
      >
        <Box sx={style.backButton}>
          <Button sx={style.btn} onClick={() => openFeedbackDialog(false)}>
            <WestIcon sx={{ color: colors.primary }} />
          </Button>
        </Box>
        <Box sx={style.headingBox}>
          <Typography sx={style.head1}>Feedback</Typography>
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
            placeholder="Select Outlet to start feedback"
            inputProps={{ "aria-label": "search google maps" }}
          />
        </Paper>
        <Box
          sx={[
            style.selectCityBox,
            {
              borderTop: "1px solid rgba(0,0,0,0.5)",
              marginBottom: "5rem",
              cursor: "pointer",
            },
          ]}
          onClick={() => showFeedbackOutelt(true)}
        >
          <Typography
            className={poppins.className}
            sx={{ fontWeight: 500, fontSize: "1rem", marginTop: "12px" }}
          >
            Select Outlet
          </Typography>
          <Typography sx={style.boldTex} className={poppins.className}>
            {fvalue} <KeyboardArrowRightIcon />
          </Typography>
        </Box>
      </List>
    </Dialog>
  );
};
export default FeedBackDialog;

const style = {
  main: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundColor: colors.background,
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
    padding: { md: "1rem", xs: "0px" },
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: "10px !important",
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
    gap: { md: "1rem", sm: "0.5rem" },
    alignItems: "center",
  },
  locationText: {},
  dilveryTo: {
    color: colors.grey,
    fontSize: "0.7rem",
  },
  iconColor: {
    color: colors.primary,
    width: "2em",
    height: "2em",
  },
  location: {
    fontWeight: 600,
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
    fontSize: "1rem",
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
    fontSize: "0.9rem",
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
};

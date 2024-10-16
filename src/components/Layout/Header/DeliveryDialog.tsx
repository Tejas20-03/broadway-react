import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  Divider,
  FormControlLabel,
  IconButton,
  InputBase,
  List,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import { Poppins } from "next/font/google";
import WestIcon from "@mui/icons-material/West";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { colors } from "@/constant/Colors";
import {
  getCitiesWithImage,
  getOutlets,
  getAreas,
} from "../../../services/location/services";
import { LocationResponse } from "@/services/location/types";
import { useSelector } from "react-redux";
import { StoreState } from "@/redux/reduxStore";
import { useRouter } from "next/navigation";

type IProps = {
  open: boolean;
  toggleDrawer: (value: boolean) => void;
  showOption: string;
  setShowOption: (value: "Delivery" | "Takeaway") => void;
  showModelCityFun: (value: boolean) => void;
  showModelCity: boolean;
  handleChange: (city: string, tax: string) => void;
  showModelOutletFun: (value: boolean) => void;
  showModelCityFun1: (value: boolean) => void;
  outlet: boolean;
  value: string;
  area: string;
  outValue: string;
  handleChangeOut: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeArea: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
});
const DeliveryDialog: React.FunctionComponent<IProps> = ({
  open,
  toggleDrawer,
  showOption,
  setShowOption,
  showModelCityFun,
  showModelCity,
  handleChange,
  showModelOutletFun,
  showModelCityFun1,
  outlet,
  value,

  outValue,
  handleChangeOut,
  handleChangeArea,
  area,
}) => {
  const [city, setCity] = useState<LocationResponse>();
  const [outletResponse, setOutletResponse] = useState<string[]>();
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [renderDileveryCity, setRenderDileveryCity] = React.useState(false);
  const [renderDileveryArea, setRenderDileveryArea] = React.useState(false);
  const [areaData, setAreaData] = useState<string[]>();
  const [searchCity, setSearchCity] = useState<string>("");
  const [searchOutlet, setSearchOutlet] = useState<string>("");
  const [searchArea, setSearchArea] = useState<string>("");
  const addressData = useSelector((state: StoreState) => state.address);
  const router = useRouter();
  const handleSearchCity = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchCity(event.target.value);
  };
  const handleSearchOutlet = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchOutlet(event.target.value);
  };
  const handleSearchArea = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchArea(event.target.value);
  };
  useEffect(() => {
    getCitiesWithImage({}).then((data) => {
      setIsLoading(true);
      if (data) {
        setCity(data);
        setIsLoading(false);
      }
    });
  }, []);
  const callOutletApi = () => {
    showModelOutletFun(true);
    getOutlets(value, {}).then((data) => {
      setIsLoading(true);
      if (data) {
        setOutletResponse(data);
        setIsLoading(false);
      }
    });
  };
  const showDileveryCityOption = (val: boolean) => {
    setRenderDileveryCity(val);
  };
  const callAreaApi = () => {
    if (value.length > 0 && showOption === "Delivery") {
      getAreas(value, {}).then((data) => {
        setIsLoading(true);
        if (data) {
          setAreaData(data);
          setIsLoading(false);
        }
      });
    }
  };
  const showDileveryAreaOption = () => {
    setRenderDileveryArea(true);
    callAreaApi();
  };

  return (
    <Dialog
      onClose={() => toggleDrawer(false)}
      open={addressData.modalOpen}
      sx={{ height: "100vh" }}
      fullScreen={window.innerWidth < 500}
    >
      <DialogTitle
        sx={{ cursor: "pointer" }}
        onClick={() => toggleDrawer(false)}
      >
        <CloseIcon onClick={() => toggleDrawer(false)} />
      </DialogTitle>
      <List
        sx={{
          pt: 0,
          height: { xs: "100%", lg: "500px" },
          width: { sm: "100%", lg: "600px" },
        }}
      >
        <Box sx={style.boxDialog}>
          <Box
            sx={[style.dialogCard, showOption === "Takeaway" && style.actives]}
            onClick={() => setShowOption("Takeaway")}
            className={poppins.className}
          >
            <Image
              className="dialogImage"
              src={"/takeaway.png"}
              width={70}
              height={55}
              alt="pps"
            />
            <Typography
              sx={{ fontSize: { sm: "20px", xs: "14px" } }}
              className={poppins.className}
            >
              Takeaway
            </Typography>
          </Box>
          <Box
            sx={[style.dialogCard, showOption === "Delivery" && style.actives]}
            onClick={() => setShowOption("Delivery")}
            className={poppins.className}
          >
            <Image
              className="dialogImage"
              src={"/delivery.png"}
              width={70}
              height={55}
              alt="pps"
            />
            <Typography
              sx={{ fontSize: { sm: "20px", xs: "14px" } }}
              className={poppins.className}
            >
              Delivery
            </Typography>
          </Box>
        </Box>
        <Box className="message-important">
          By updating your current Takeaway/Delivery selection. Your cart items
          will be removed
        </Box>
        <Box sx={style.boxDialog}>
          <Typography variant="h2" sx={style.showOptions}>
            {showOption}
          </Typography>
        </Box>
        {showOption === "Takeaway" && (
          <Box sx={style.selectCityBox} onClick={() => showModelCityFun(true)}>
            <Typography
              className={poppins.className}
              sx={{ fontWeight: 600, fontSize: "1rem" }}
            >
              Select City
            </Typography>
            <Typography sx={style.boldTex} className={poppins.className}>
              {value ? value : "Select"} <KeyboardArrowRightIcon />
            </Typography>
          </Box>
        )}
        {showModelCity && (
          <>
            <Dialog
              onClose={() => showModelCityFun(false)}
              open={showModelCity}
              sx={{ height: "100vh" }}
              fullScreen={window.innerWidth < 500}
            >
              <List
                sx={{
                  pt: 0,
                  height: { xs: "100%", lg: "600px" },
                  width: { sm: "100%", lg: "600px" },
                  overflow: "hidden",
                }}
              >
                <Box sx={style.backButton}>
                  <Button
                    sx={style.btn}
                    onClick={() => showModelCityFun1(false)}
                  >
                    <WestIcon sx={{ color: colors.primary }} />
                  </Button>
                </Box>
                <Box sx={style.headingBox}>
                  <Typography sx={style.head1}>Select City</Typography>
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
                    placeholder="Search Google Maps"
                    inputProps={{ "aria-label": "search google maps" }}
                    value={searchCity}
                    onChange={(e) => handleSearchCity(e)}
                  />
                </Paper>
                {isLoading ? (
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      height: "100%",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgress
                      sx={{ color: colors.primary }}
                      size="4em"
                      thickness={5}
                    />
                  </Box>
                ) : (
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={value}
                    onChange={(e) => {
                      const temp = JSON.parse(e.target.value);
                      handleChange(temp.name, temp.tax);
                    }}
                    sx={{
                      padding: "2rem",
                      height: "100%",
                      overflowY: "scroll",
                      flexWrap: "nowrap !important",
                    }}
                  >
                    {city &&
                      city
                        ?.filter((item) =>
                          item.Name.toLowerCase().includes(
                            searchCity.toLowerCase()
                          )
                        )
                        .map((data, index) => {
                          return (
                            <Box key={index}>
                              <FormControlLabel
                                className={poppins.className}
                                sx={{ fontSize: "4rem", width: "100%" }}
                                value={JSON.stringify({
                                  name: data.Name,
                                  tax: data.delivery_tax,
                                })}
                                control={<Radio />}
                                label={data.Name}
                              />
                              <Divider />
                            </Box>
                          );
                        })}
                  </RadioGroup>
                )}
              </List>
            </Dialog>
          </>
        )}

        {value && showOption !== "Delivery" && showOption && (
          <Box sx={style.selectCityBox} onClick={callOutletApi}>
            <Typography
              className={poppins.className}
              sx={{ fontWeight: 600, fontSize: "1rem" }}
            >
              Select Outlet
            </Typography>
            <Typography sx={style.boldTex} className={poppins.className}>
              {outValue ? outValue : "Select"} <KeyboardArrowRightIcon />
            </Typography>
          </Box>
        )}
        {outValue.length > 0 && showOption === "Takeaway" && (
          <Box sx={style.showMenuBox}>
            <Button
              className={poppins.className}
              sx={style.btns}
              onClick={() => {
                toggleDrawer(false),
                  window.localStorage.setItem(
                    "address",
                    JSON.stringify({ ...addressData, modalOpen: false })
                  );
                router.push("/");
              }}
            >
              SHOW MENU
            </Button>
          </Box>
        )}
        {outlet && (
          <>
            <Dialog
              onClose={() => showModelCityFun(false)}
              open={outlet}
              sx={{ height: "100vh" }}
              fullScreen={window.innerWidth < 500}
            >
              <List
                sx={{
                  pt: 0,
                  height: { xs: "100%", lg: "600px" },
                  width: { sm: "100%", lg: "600px" },
                  overflow: "hidden",
                }}
              >
                <Box sx={style.backButton}>
                  <Button
                    sx={style.btn}
                    onClick={() => showModelOutletFun(false)}
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
                    value={searchOutlet}
                    onChange={handleSearchOutlet}
                  />
                </Paper>
                {isLoading ? (
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      height: "100%",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgress
                      sx={{ color: colors.primary }}
                      size="4em"
                      thickness={5}
                    />
                  </Box>
                ) : (
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={outValue}
                    onChange={handleChangeOut}
                    sx={{
                      padding: "2rem",
                      height: "100%",
                      overflowY: "scroll",
                      flexWrap: "nowrap !important",
                      paddingBottom: 20,
                    }}
                  >
                    {outletResponse &&
                      outletResponse
                        ?.filter((item) =>
                          item
                            .toLowerCase()
                            .includes(searchOutlet.toLowerCase())
                        )
                        .map((data, index) => {
                          return (
                            <Box key={index}>
                              <FormControlLabel
                                className={poppins.className}
                                sx={{ fontSize: "4rem" }}
                                value={data}
                                control={<Radio color="primary" />}
                                label={data}
                              />
                              <Divider />
                            </Box>
                          );
                        })}
                  </RadioGroup>
                )}
              </List>
            </Dialog>
          </>
        )}
        {showOption === "Delivery" && (
          <>
            <Box
              onClick={() => showDileveryCityOption(true)}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingX: "10px",
                width: "100%",
              }}
            >
              <Typography
                className={poppins.className}
                sx={{ fontWeight: 600, fontSize: "1rem" }}
              >
                Select City
              </Typography>
              <Typography sx={style.boldTex} className={poppins.className}>
                {value ? value : "Select"} <KeyboardArrowRightIcon />
              </Typography>
            </Box>
          </>
        )}
        {renderDileveryCity && showOption === "Delivery" && (
          <>
            <Dialog
              onClose={() => showDileveryCityOption(false)}
              open={renderDileveryCity}
              sx={{
                height: "100vh",
              }}
              fullScreen={window.innerWidth < 680}
            >
              <List
                sx={{
                  pt: 0,
                  height: { xs: "100vh", lg: "600px" },
                  width: { sm: "100%", lg: "600px" },
                  overflow: "hidden",
                }}
              >
                <Box sx={style.backButton}>
                  <Button
                    sx={style.btn}
                    onClick={() => showDileveryCityOption(false)}
                  >
                    <WestIcon sx={{ color: colors.primary }} />
                  </Button>
                </Box>
                <Box sx={style.headingBox}>
                  <Typography sx={style.head1}>Select City</Typography>
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
                    placeholder="Search city"
                    inputProps={{ "aria-label": "search google maps" }}
                    value={searchCity}
                    onChange={(e) => handleSearchCity(e)}
                  />
                </Paper>
                {isLoading ? (
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      height: "100%",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgress
                      sx={{ color: colors.primary }}
                      size="4em"
                      thickness={5}
                    />
                  </Box>
                ) : (
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={value}
                    onChange={(e) => {
                      const temp = JSON.parse(e.target.value);
                      handleChange(temp.name, temp.tax);
                      setRenderDileveryCity(false);
                    }}
                    sx={{
                      padding: "2rem",
                      height: "100%",
                      overflowY: "scroll",
                      flexWrap: "nowrap !important",
                    }}
                  >
                    {city &&
                      city
                        ?.filter((item) =>
                          item.Name.toLowerCase().includes(
                            searchCity.toLowerCase()
                          )
                        )
                        .map((data, index) => {
                          return (
                            <Box key={index}>
                              <FormControlLabel
                                className={poppins.className}
                                sx={{ fontSize: "4rem", width: "100%" }}
                                value={JSON.stringify({
                                  name: data.Name,
                                  tax: data.delivery_tax,
                                })}
                                control={<Radio />}
                                label={data.Name}
                              />
                              <Divider />
                            </Box>
                          );
                        })}
                  </RadioGroup>
                )}
              </List>
            </Dialog>
          </>
        )}
        {value.length > 0 && showOption === "Delivery" && (
          <Box
            onClick={showDileveryAreaOption}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingX: "10px",
              width: "100%",
              paddingY: "20px",
            }}
          >
            <Typography
              className={poppins.className}
              sx={{ fontWeight: 600, fontSize: "1rem" }}
            >
              Select Area
            </Typography>
            <Typography sx={style.boldTex} className={poppins.className}>
              {area ? area : "Select"} <KeyboardArrowRightIcon />
            </Typography>
          </Box>
        )}
        {renderDileveryArea && (
          <>
            <Dialog
              onClose={() => setRenderDileveryArea(false)}
              open={renderDileveryArea}
              sx={{ height: "100vh" }}
              fullScreen={window.innerWidth < 500}
            >
              <List
                sx={{
                  pt: 0,
                  height: { xs: "100vh", lg: "600px" },
                  width: { sm: "100%", lg: "600px" },
                  overflow: "hidden",
                }}
              >
                <Box sx={style.backButton}>
                  <Button
                    sx={style.btn}
                    onClick={() => setRenderDileveryArea(false)}
                  >
                    <WestIcon sx={{ color: colors.primary }} />
                  </Button>
                </Box>
                <Box sx={style.headingBox}>
                  <Typography sx={style.head1}>Select Area</Typography>
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
                    placeholder="Search area"
                    inputProps={{ "aria-label": "search google maps" }}
                    value={searchArea}
                    onChange={handleSearchArea}
                  />
                </Paper>
                {isLoading ? (
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      height: "100%",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgress
                      sx={{ color: colors.primary }}
                      size="4em"
                      thickness={5}
                    />
                  </Box>
                ) : (
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={area}
                    onChange={(e) => {
                      handleChangeArea(e);
                      setRenderDileveryArea(false);
                    }}
                    sx={{
                      padding: "2rem",
                      height: "100%",
                      overflowY: "scroll",
                      flexWrap: "nowrap !important",
                      paddingBottom: 20,
                    }}
                  >
                    {areaData &&
                      areaData
                        ?.filter((item) =>
                          item.toLowerCase().includes(searchArea.toLowerCase())
                        )
                        .map((data, index) => {
                          return (
                            <Box key={index}>
                              <FormControlLabel
                                className={poppins.className}
                                sx={{ fontSize: "4rem", width: "100%" }}
                                value={data}
                                control={<Radio />}
                                label={data}
                              />
                              <Divider />
                            </Box>
                          );
                        })}
                  </RadioGroup>
                )}
              </List>
            </Dialog>
          </>
        )}
        {area.length > 0 && showOption === "Delivery" && (
          <Box sx={style.showMenuBox}>
            <Button
              className={poppins.className}
              sx={style.btns}
              onClick={() => {
                toggleDrawer(false),
                  window.localStorage.setItem(
                    "address",
                    JSON.stringify({ ...addressData, modalOpen: false })
                  );
                router.push("/");
              }}
            >
              SHOW MENU
            </Button>
          </Box>
        )}
      </List>
    </Dialog>
  );
};

export default DeliveryDialog;

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
    fontSize: "1rem",
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
    padding: "17px 17px 17px 5%",
    textAlign: "left",
    textTransform: "uppercase",
    background: "#ffffff17",
    overflow: "hidden",
    color: colors.black, // Assuming --main-color is your primary color variable
    fontWeight: 900,
    width: "100%",
    border: "solid 1px #e2e2e2",
  },
  actives: {
    color: colors.primary,
    boxShadow: "4px 7px 25px #00000026",
    zIndex: 2,
  },
  showOptions: {
    fontWeight: 700,
    color: colors.black,
    opacity: 0.7,
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
  btns: {
    width: "90%",
    transition: "all ease-in-out 0.5s",
    backgroundColor: colors.primary,
    color: colors.white,
    fontWeight: 700,
    paddingY: "10px",
    ":hover": {
      backgroundColor: colors.primary,
      color: colors.white,
    },
  },
  showMenuBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginY: "14px",
  },
};

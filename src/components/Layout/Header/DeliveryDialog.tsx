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
  Slide,
  SlideProps,
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
import logo from "../../../../public/Assets/broadwayPizzaLogo.png";
import { TiLocationArrowOutline } from "react-icons/ti";

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
  weight: ["300", "700"],
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
      fullScreen={window.innerWidth < 700}
      sx={{
        "& .MuiDialog-paper": {
          width: "100%",
          maxWidth: "800px",
          height: "100%",
          maxHeight: { xs: 'none', sm: '690px' },
          margin: 0,
        },
        '& .MuiBackdrop-root': {
          backdropFilter: 'blur(5px)',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px',
          position: 'relative',
        }}
      >
        <Box sx={{ position: 'absolute', left: 12, top: 8, width: 120, height: 53 }}>
          <Image src={logo} alt="Broadway Pizza Logo" width={120} height={53} />
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          onClick={() => toggleDrawer(false)}
          aria-label="close"
          sx={{
            backgroundColor: '#e6f2ff',
            borderRadius: '50%',
            padding: '8px',
            width: 40,
            height: 40,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Box sx={{ margin: "10px 0px", boxSizing: "border-box", position: "relative", zIndex: 1, padding: "0px 16px" }}>
        <Box
          sx={{
            padding: "8px 12px",
            backgroundColor: "#e6f2ff",
            margin: "5px 5px",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px solid #ffe9ad",
            height: "auto",
            maxWidth: "750px",
            fontSize: "12px",
          }}
        >
          <Box>
            <Typography
              variant="subtitle1"
              className={poppins.className}
              sx={{ color: colors.black, fontSize: "12px" }}
            >
              Selected {showOption}:
            </Typography>
            <Typography
              variant="body1"
              className={poppins.className}
              sx={{ color: colors.black, fontSize: "12px" }}
            >
              {value && area ? `${value}, ${area}` : "Not selected"}
            </Typography>
          </Box>
          <TiLocationArrowOutline color="orange" fontSize="32px" />
        </Box>
      </Box>

      <Box sx={{ margin: "10px 0px", boxSizing: "border-box", position: "relative", zIndex: 1, padding: "0px 16px" }}>
        <List
          sx={{
            pt: 0,
            height: "100%",
            width: "100%",
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={style.optionsContainer}>
            <Box
              sx={[
                style.optionItem,
                showOption === "Delivery" ? style.activeOption : style.inactiveOption,
                { flex: 1, justifyContent: "center" },
              ]}
              onClick={() => setShowOption("Delivery")}
              className={poppins.className}
            >
              <Box sx={style.imageContainer}>
                <Image
                  src={"/delivery.png"}
                  width={40}
                  height={40}
                  alt="delivery"
                />
              </Box>
              <Typography sx={style.optionText}>DELIVERY</Typography>
            </Box>
            <Box
              sx={[
                style.optionItem,
                showOption === "Takeaway" ? style.activeOption : style.inactiveOption,
                { flex: 1, justifyContent: "center" },
              ]}
              onClick={() => setShowOption("Takeaway")}
              className={poppins.className}
            >
              <Box sx={style.imageContainer}>
                <Image
                  src={"/takeaway.png"}
                  width={40}
                  height={40}
                  alt="takeaway"
                />
              </Box>
              <Typography sx={style.optionText}>PICKUP</Typography>
            </Box>
          </Box>
          {showOption !== "Takeaway" && (
            <Box sx={style.messageImportant} className={poppins.className}>
              <Typography sx={{ color: colors.grey }}>
                <span style={{color:"green"}}>Login with your profile{' '}</span> to save your address and enjoy more features!
              </Typography>
            </Box>
          )}


          {showOption === "Takeaway" && (
            <Box sx={style.selectCityBox} onClick={() => showModelCityFun(true)}>
              <Typography
                className={poppins.className}
                sx={{ fontWeight: 400, fontSize: "1rem" }}
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
                fullScreen
                TransitionComponent={Slide}
                TransitionProps={{ direction: "up" } as SlideProps}
                PaperProps={{
                  sx: {
                    position: 'absolute',
                    bottom: 0,
                    m: 0,
                    height: '100%',
                    maxHeight: { xs: '100%', sm: '690px' },
                    width: '100%',
                    maxWidth: '800px',
                  },
                }}
              >
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h5" sx={{ fontWeight: 600, flex: 1, textAlign: 'center' }}>
                    Select City
                  </Typography>
                  <Typography
                    onClick={() => showModelCityFun(false)}
                    sx={{
                      color: colors.black,
                      cursor: 'pointer',
                      fontWeight: 300,
                      fontSize: "20px"
                    }}
                  >
                    Close
                  </Typography>
                </Box>

                <Paper
                  component="form"
                  sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    mb: 2,
                    px: 2,
                    boxShadow: '0 2px 4px -1px rgba(0,0,0,0.1)',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -4,
                      left: 0,
                      right: 0,
                      height: 4,
                      background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0))',
                    }
                  }}
                >
                  {/* <IconButton sx={{ p: "10px" }} aria-label="search">
                   
                  </IconButton> */}
                  <SearchIcon sx={{ marginRight: "8px" }} />
                  <InputBase
                    sx={{ ml: 1, flex: 1, fontSize: "20px" }}
                    placeholder="Search City"
                    inputProps={{ "aria-label": "search city" }}
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
                      padding: "1rem",
                      height: "100%",
                      overflowY: "auto",
                      borderTop: `1px solid ${colors.lightGrey}`,
                      borderBottom: `1px solid ${colors.lightGrey}`,
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
                            <Box key={index} sx={{ position: "relative" }}>
                              <FormControlLabel
                                className={poppins.className}
                                sx={{
                                  fontSize: "1rem",
                                  width: "100%",
                                  mb: 1,
                                  '& .MuiRadio-root': { color: colors.grey, marginRight: 2 },
                                  '& .Mui-checked': { color: colors.primary },
                                }}
                                value={JSON.stringify({
                                  name: data.Name,
                                  tax: data.delivery_tax,
                                })}
                                control={<Radio />}
                                label={data.Name}
                              />
                              <Divider sx={{ position: 'absolute', bottom: 0, left: 40, right: 0 }} />
                            </Box>
                          );
                        })}
                  </RadioGroup>
                )}
              </Dialog>
            </>
          )}

          {value && showOption !== "Delivery" && showOption && (
            <Box sx={style.selectCityBox} onClick={callOutletApi}>
              <Typography
                className={poppins.className}
                sx={{ fontWeight: 400, fontSize: "1rem" }}
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
                SAVE LOCATION
              </Button>
            </Box>
          )}
          {outlet && (
            <Dialog
              onClose={() => showModelOutletFun(false)}
              open={outlet}
              fullScreen
              TransitionComponent={Slide}
              TransitionProps={{ direction: "up" } as SlideProps}
              PaperProps={{
                sx: {
                  position: 'absolute',
                  bottom: 0,
                  m: 0,
                  height: '100%',
                  maxHeight: { xs: '100%', sm: '690px' },
                  width: '100%',
                  maxWidth: '800px',
                },
              }}
            >
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 600, flex: 1, textAlign: 'center' }}>
                  Select Outlet
                </Typography>
                <Typography
                  onClick={() => showModelOutletFun(false)}
                  sx={{
                    color: colors.black,
                    cursor: 'pointer',
                    fontWeight: 300,
                    fontSize: "20px"
                  }}
                >
                  Close
                </Typography>
              </Box>

              <Paper
                component="form"
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  mb: 2,
                  px: 2,
                  boxShadow: '0 2px 4px -1px rgba(0,0,0,0.1)',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -4,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0))',
                  }
                }}
              >
                <SearchIcon sx={{ marginRight: "8px" }} />
                <InputBase
                  sx={{ ml: 1, flex: 1, fontSize: "20px" }}
                  placeholder="Search Outlet"
                  inputProps={{ "aria-label": "search outlet" }}
                  value={searchOutlet}
                  onChange={handleSearchOutlet}
                />
              </Paper>
              {isLoading ? (
                <Box sx={{ display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
                  <CircularProgress sx={{ color: colors.primary }} size="4em" thickness={5} />
                </Box>
              ) : (
                <RadioGroup
                  value={outValue}
                  onChange={handleChangeOut}
                  sx={{
                    padding: "1rem",
                    height: "100%",
                    overflowY: "auto",
                    borderTop: `1px solid ${colors.lightGrey}`,
                    borderBottom: `1px solid ${colors.lightGrey}`,
                  }}
                >
                  {outletResponse &&
                    outletResponse
                      ?.filter((item) => item.toLowerCase().includes(searchOutlet.toLowerCase()))
                      .map((data, index) => (
                        <Box key={index} sx={{ position: "relative" }}>
                          <FormControlLabel
                            className={poppins.className}
                            sx={{
                              fontSize: "1rem",
                              width: "100%",
                              mb: 1,
                              '& .MuiRadio-root': { color: colors.grey, marginRight: 2 },
                              '& .Mui-checked': { color: colors.primary },
                            }}
                            value={data}
                            control={<Radio />}
                            label={data}
                          />
                          <Divider sx={{ position: 'absolute', bottom: 0, left: 40, right: 0 }} />
                        </Box>
                      ))}
                </RadioGroup>
              )}
            </Dialog>
          )}

          {showOption === "Delivery" && (
            <>
              <Box
                onClick={() => showDileveryCityOption(true)}
                sx={style.selectCityBox}
              >
                <Typography
                  className={poppins.className}
                  sx={{ fontWeight: 400, fontSize: "1rem" }}
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
                fullScreen
                TransitionComponent={Slide}
                TransitionProps={{ direction: "up" } as SlideProps}
                PaperProps={{
                  sx: {
                    position: 'absolute',
                    bottom: 0,
                    m: 0,
                    height: '100%',
                    maxHeight: { xs: '100%', sm: '690px' },
                    width: '100%',
                    maxWidth: '800px',
                  },
                }}
              >
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h5" sx={{ fontWeight: 600, flex: 1, textAlign: 'center' }}>
                    Select City
                  </Typography>
                  <Typography
                    onClick={() => showDileveryCityOption(false)}
                    sx={{
                      color: colors.black,
                      cursor: 'pointer',
                      fontWeight: 300,
                      fontSize: "20px"
                    }}
                  >
                    Close
                  </Typography>
                </Box>


                <Paper
                  component="form"
                  sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    mb: 2,
                    px: 2,
                    boxShadow: '0 2px 4px -1px rgba(0,0,0,0.1)',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -4,
                      left: 0,
                      right: 0,
                      height: 4,
                      background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0))',
                    }
                  }}
                >
                  <SearchIcon sx={{ marginRight: "8px" }} />

                  <InputBase
                    sx={{ ml: 1, flex: 1, fontSize: "20px" }}
                    placeholder="Search City"
                    inputProps={{ "aria-label": "search city" }}
                    value={searchCity}
                    onChange={(e) => handleSearchCity(e)}
                  />

                </Paper>
                {isLoading ? (
                  <Box sx={{ display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
                    <CircularProgress sx={{ color: colors.primary }} size="4em" thickness={5} />
                  </Box>
                ) : (
                  <RadioGroup
                    value={value}
                    onChange={(e) => {
                      const temp = JSON.parse(e.target.value);
                      handleChange(temp.name, temp.tax);
                      setRenderDileveryCity(false);
                    }}
                    sx={{
                      padding: "1rem",
                      height: "100%",
                      overflowY: "auto",
                      borderTop: `1px solid ${colors.lightGrey}`,
                      borderBottom: `1px solid ${colors.lightGrey}`,
                    }}
                  >
                    {city &&
                      city
                        ?.filter((item) => item.Name.toLowerCase().includes(searchCity.toLowerCase()))
                        .map((data, index) => (
                          <Box key={index} sx={{ position: "relative" }}>
                            <FormControlLabel
                              className={poppins.className}
                              sx={{
                                fontSize: "1rem",
                                width: "100%",
                                mb: 1,
                                '& .MuiRadio-root': { color: colors.grey, marginRight: 2 },
                                '& .Mui-checked': { color: colors.primary },
                              }}
                              value={JSON.stringify({ name: data.Name, tax: data.delivery_tax })}
                              control={<Radio />}
                              label={data.Name}
                            />
                            <Divider sx={{ position: 'absolute', bottom: 0, left: 40, right: 0 }} />
                          </Box>
                        ))}
                  </RadioGroup>
                )}

              </Dialog>
            </>
          )}
          {value.length > 0 && showOption === "Delivery" && (
            <Box
              onClick={showDileveryAreaOption}
              sx={style.selectCityBox}
            >
              <Typography
                className={poppins.className}
                sx={{ fontWeight: 400, fontSize: "1rem" }}
              >
                Select Area
              </Typography>
              <Typography sx={style.boldTex} className={poppins.className}>
                {area ? area : "Select"} <KeyboardArrowRightIcon />
              </Typography>
            </Box>
          )}
          {showOption === "Delivery" && (
            <Box sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              paddingY: "10px",
            }}>
              <Typography
                className={poppins.className}
                sx={{ fontWeight: 400, fontSize: "0.8rem" }}
              >
                Phone
              </Typography>
              <InputBase sx={{
                ...style.inputStyle,
                width: "100%",
                fontSize: "1rem",
                borderBottom: `2px solid ${colors.lightGrey}`,
                paddingY: "4px",
              }}
                className={poppins.className}
                placeholder="03xxxxxxxxx" inputProps={{ "aria-label": "phone number" }} />
            </Box>
          )}
          {renderDileveryArea && (
            <>
              <Dialog
                onClose={() => setRenderDileveryArea(false)}
                open={renderDileveryArea}
                fullScreen
                TransitionComponent={Slide}
                TransitionProps={{ direction: "up" } as SlideProps}
                PaperProps={{
                  sx: {
                    position: 'absolute',
                    bottom: 0,
                    m: 0,
                    height: '100%',
                    maxHeight: { xs: '100%', sm: '690px' },
                    width: '100%',
                    maxWidth: '800px',
                  },
                }}
              >
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h5" sx={{ fontWeight: 600, flex: 1, textAlign: 'center' }}>
                    Select Area
                  </Typography>
                  <Typography
                    onClick={() => setRenderDileveryArea(false)}
                    sx={{
                      color: colors.black,
                      cursor: 'pointer',
                      fontWeight: 300,
                      fontSize: "20px"
                    }}
                  >
                    Close
                  </Typography>
                </Box>
                <Paper
                  component="form"
                  sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    mb: 2,
                    px: 2,
                    boxShadow: '0 2px 4px -1px rgba(0,0,0,0.1)',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -4,
                      left: 0,
                      right: 0,
                      height: 4,
                      background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0))',
                    }
                  }}
                >
                  <SearchIcon sx={{ marginRight: "8px" }} />

                  <InputBase
                    sx={{ ml: 1, flex: 1, fontSize: "20px" }}
                    placeholder="Search Area"
                    inputProps={{ "aria-label": "search area" }}
                    value={searchArea}
                    onChange={handleSearchArea}
                  />
                </Paper>
                {isLoading ? (
                  <Box sx={{ display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
                    <CircularProgress sx={{ color: colors.primary }} size="4em" thickness={5} />
                  </Box>
                ) : (
                  <RadioGroup
                    value={area}
                    onChange={(e) => {
                      handleChangeArea(e);
                      setRenderDileveryArea(false);
                    }}
                    sx={{
                      padding: "1rem !important",
                      height: "calc(100% - 120px) !important",
                      overflowY: "auto !important",
                      display: "flex !important",
                      flexDirection: "column !important",
                      flexWrap: "nowrap !important",
                      borderTop: `1px solid ${colors.lightGrey} !important`,
                      borderBottom: `1px solid ${colors.lightGrey} !important`,
                    }}
                  >
                    {areaData &&
                      areaData
                        ?.filter((item) => item.toLowerCase().includes(searchArea.toLowerCase()))
                        .map((data, index) => (
                          <Box key={index} sx={{ position: "relative" }}>
                            <FormControlLabel
                              className={poppins.className}
                              sx={{
                                fontSize: "1rem",
                                width: "100%",
                                mb: 1,
                                '& .MuiRadio-root': { color: colors.grey, marginRight: 2 },
                                '& .Mui-checked': { color: colors.primary },
                              }}
                              value={data}
                              control={<Radio />}
                              label={data}
                            />
                            <Divider sx={{ position: 'absolute', bottom: 0, left: 40, right: 0 }} />
                          </Box>
                        ))}
                  </RadioGroup>

                )}

              </Dialog>
            </>
          )}
          {showOption === "Delivery" && (
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
                SAVE LOCATION
              </Button>
            </Box>
          )}
        </List>
      </Box>
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
  messageImportant: {
    padding: { xs: "12px 16px", sm: "8px 0px" },
    textAlign: "left",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    fontSize: { xs: "14px", sm: "12px" },
    opacity: "0.8",
    gap: "4px",
    marginBottom: "20px",
    // backgroundColor: { xs: "#f0f0f0", sm: "transparent" },
    borderRadius: { xs: "8px", sm: "0" },
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
  optionsContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    marginBottom: "8px",
    borderBottom: `2px solid ${colors.lightGrey}`
  },
  activeOption: {
    borderBottom: "2px solid #FFD700",
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
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "8px",
    "& img": {
      objectFit: "contain",
    },
  },
  optionImage: {
    objectFit: "contain",
  },
  optionItem: {
    display: "flex",
    alignItems: "center",
    padding: "15px",
    cursor: "pointer",
    borderBottom: "2px solid transparent",
    transition: "all 0.3s ease",
    justifyContent: "center",
    marginLeft: "2px",
    marginRight: "2px",
  },
  inactiveOption: {
    opacity: 0.5,
    color: colors.grey,
  },
  optionText: {
    fontSize: "16px",
    fontWeight: 600,
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
    // paddingX: "16px",
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
    color: colors.grey,
    fontWeight: 400,
    fontSize: "0.8rem",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  selectCityBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem 0rem",
    marginTop: "16px",
    borderBottom: `2px solid ${colors.lightGrey}`
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
    width: "100%",
    transition: "all ease-in-out 0.5s",
    backgroundColor: colors.primary,
    color: colors.black,
    fontWeight: 700,
    paddingY: "10px",
    ":hover": {
      backgroundColor: colors.primary,
      color: colors.black,
    },
  },
  showMenuBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginY: "14px",
    cursor: "pointer",
    color: "#000",
  },
};

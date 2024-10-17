import React, { useState } from "react";
import {
  Alert,
  Box,
  Dialog,
  Slide,
  Snackbar,
  Typography,
  Modal,
} from "@mui/material";
import { colors } from "../../constant/Colors";
import Image from "next/image";
import AddIcon from "@mui/icons-material/Add";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { Poppins } from "next/font/google";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import { TransitionProps } from "@mui/material/transitions";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Premium from "../PremiumDeals/Premium";
import { getOptions } from "@/services/Home/services";
import { MenuItemData } from "@/services/Home/types";
import { useDispatch, useSelector } from "react-redux";
import { StoreDispatch, StoreState } from "@/redux/reduxStore";
import { addToCart } from "@/redux/cart/actions";
import { add } from "lodash";
import { addressesActions } from "@/redux/address/slice";

const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

interface FacebookPixelParams {
  value: number;
  currency: string;
}

declare const fbq: (type: string, eventName: string) => void;

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

type Iprops = {
  text: string;
  price: string;
  src: string;
  discount: number;
  description: string;
  serving: string;
  discountedPrice: string;
  id: string;
  isLoading: boolean;
  isNew: boolean;
};

const PremiumDealsCard: React.FC<Iprops> = ({
  text,
  price,
  src,
  discount,
  description,
  serving,
  discountedPrice,
  id,
  isLoading,
  isNew,
}) => {
  const [isAddress, setIsAddress] = useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState<MenuItemData | undefined>();
  const [productId, setProductId] = useState<number>(0);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const addressData = useSelector((state: StoreState) => state.address);
  const dispatch = useDispatch<StoreDispatch>();

  const toggleDrawer = (newOpen: boolean) => {
    if (!addressData.addressType) {
      setIsAddress(true);
      setOpen(false);
      dispatch(addressesActions.setAddresses({ modalOpen: newOpen }));

      return;
    } else if (addressData.addressType === "Delivery") {
      if (addressData.area === "" || addressData.city === "") {
        dispatch(addressesActions.setAddresses({ modalOpen: newOpen }));
        setIsAddress(true);
        setOpen(false);
        return;
      }
    } else if (addressData.addressType === "Takeaway") {
      if (addressData.city === "" || addressData.outlet === "") {
        setIsAddress(true);
        dispatch(addressesActions.setAddresses({ modalOpen: newOpen }));
        setOpen(false);
        return;
      }
    }
    if (newOpen) {
      getOptions(id, {}).then((data) => {
        const id = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        setProductId(Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000);
        setData(data?.Data && data?.Data);

        if (
          data?.Data.MenuSizesList[0].FlavourAndToppingsList &&
          data?.Data.MenuSizesList[0].FlavourAndToppingsList.length <= 0
        ) {
          fbq("track", "AddToCart");
          dispatch(
            addToCart({
              products: {
                options: [],
                Price: Number(discountedPrice),
                Quantity: 1,
                ProductName: data?.Data.Name,
                ItemID: data.Data.MenuSizesList[0].MenuItemID,
                CategoryName: data.Data.CategoryName,
                MinimumDelivery: String(
                  data.Data.MenuSizesList[0].MinDeliveryPrice
                ),
                SizeID: data.Data.MenuSizesList[0].ID,
                TotalProductPrice: data.Data.MenuSizesList[0].DiscountedPrice,
                discountGiven:
                  data?.Data.MenuSizesList[0]?.ActualPrice > 0
                    ? data?.Data.MenuSizesList[0]?.Discount
                    : 0,
                ID: id,
                ItemImage: data.Data.ItemImage,
                PaymentType: data.Data.PaymentType,
              },
            })
          );
          setOpenSnackbar(!openSnackbar);
        } else {
          setOpen(newOpen);
        }
      });
    } else {
      setOpen(newOpen);
      setData(undefined);
    }
  };
  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <>
      <Box sx={style.card} onClick={() => toggleDrawer(true)}>
        <Box sx={style.media}>
          {!isLoading ? (
            <Image
              src={src}
              fill={false}
              alt="oops"
              style={style.image}
              width={180}
              height={180}
            />
          ) : (
            <Skeleton width={180} height={180} />
          )}
        </Box>
        <Box sx={style.infoContainer}>
          {discount > 0 && (
            <Typography sx={style.saveDiscount} className={poppins.className}>
              save {discount}%
            </Typography>
          )}
          {isNew && (
            <Typography sx={style.newTag} className={poppins.className}>
              New
            </Typography>
          )}
          {serving && Number(serving) > 0 && (
            <Box sx={style.serving}>
              <PermIdentityOutlinedIcon style={style.user} fontSize={"small"} />
              <Typography sx={style.servingText} className={poppins.className}>
                {serving} x
              </Typography>
            </Box>
          )}
        </Box>
        <Box sx={style.content}>
          {!isLoading ? (
            <Box sx={style.add}>
              <Box sx={style.addBox}>
                <AddIcon sx={{ color: "white" }} />
              </Box>
            </Box>
          ) : (
            <Box sx={style.add}>
              {" "}
              <Skeleton />{" "}
            </Box>
          )}

          {!isLoading ? (
            <Box sx={style.titleBox}>
              <Typography className={poppins.className} sx={style.title}>
                {text}
              </Typography>
            </Box>
          ) : (
            <Box sx={style.titleBox}>
              <Skeleton sx={{ width: "100%" }} />{" "}
            </Box>
          )}
          {description !== "" && (
            <Typography
              className={poppins.className}
              dangerouslySetInnerHTML={{ __html: description }}
              sx={style.discription}
            />
          )}

          {!isLoading ? (
            <Box sx={style.priceContanier}>
              {Number(discountedPrice) > 0 ? (
                <Typography
                  sx={style.discountedPrice}
                  className={poppins.className}
                >
                  Rs.{discountedPrice}
                </Typography>
              ) : (
                <Typography
                  sx={style.gap}
                  className={poppins.className}
                ></Typography>
              )}
              {Number(price || 0) > 0 ? (
                <Typography
                  sx={style.actualPrice}
                  className={poppins.className}
                >
                  Rs.{price}
                </Typography>
              ) : null}
            </Box>
          ) : (
            <Box sx={style.priceContanier}>
              {" "}
              <Skeleton sx={{ width: "100%" }} />{" "}
            </Box>
          )}
        </Box>
      </Box>
      <Root sx={{ display: { lg: "none", xs: "block" } }}>
        <CssBaseline />
        <Global
          styles={{
            ".MuiDrawer-root > .MuiPaper-root": {
              height: `100%`,
              overflow: "visible",
            },
          }}
        />

        {open && (
          <SwipeableDrawer
            anchor="bottom"
            open={open}
            onClose={() => toggleDrawer(false)}
            onOpen={() => {}}
            swipeAreaWidth={drawerBleeding}
            disableSwipeToOpen={false}
            ModalProps={{
              keepMounted: true,
              BackdropProps: {
                style: {
                  backgroundColor: "transparent", // Make the backdrop transparent
                },
              },
              // Override styles to allow overflow on the SwipeableDrawer itself
              style: {
                overflow: "auto",
              },
            }}
            sx={{ display: { lg: "none", xs: "block" } }}
          >
            <StyledBox
              sx={{
                position: "absolute",
                top: -drawerBleeding,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                visibility: "visible",
                right: 0,
                left: 0,
                display: { lg: "none", xs: "block" },
              }}
            ></StyledBox>
            <StyledBox
              sx={{
                pb: 2,
                height: "100%",
                overflow: "auto",
              }}
            >
              {open && data && (
                <Premium
                  onClick={() => setOpen(false)}
                  id={id}
                  data={data}
                  setData={setData}
                  setProductId={setProductId}
                  productId={productId}
                  selectedIndex={selectedIndex}
                  setSelectedIndex={setSelectedIndex}
                />
              )}
            </StyledBox>
          </SwipeableDrawer>
        )}
      </Root>

      {/* large screen PremiumDeals */}

      {open && (
        <Dialog
          fullWidth={true}
          className="premiumDialog"
          sx={{
            display: { lg: "block", xs: "none" },
            borderRadius: 30,
            marginX: "15%",
          }}
          open={open}
          // TransitionComponent={Transition}
          // keepMounted
          onClose={() => {
            toggleDrawer(false);
          }}
          disableScrollLock={false}
          aria-describedby="alert-dialog-slide-description"
          maxWidth={false}
        >
          {data && (
            <Premium
              onClick={() => setOpen(false)}
              id={id}
              data={data}
              setData={setData}
              setProductId={setProductId}
              productId={productId}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
            />
          )}
        </Dialog>
      )}
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
          Product Added To Cart!
        </Alert>
      </Snackbar>
      {isAddress && (
        <Modal
          // className="premiumDialog"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          open={isAddress}
          onClose={() => setIsAddress(false)}
          disableAutoFocus
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              background: "white",
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              className={poppins.className}
              sx={{
                fontWeight: 700,
                textAlign: "left",
                padding: "20px",
                color: colors.black,
                alignSelf: "start",
              }}
            >
              ERROR
            </Typography>
            <Typography
              className={poppins.className}
              sx={{
                fontWeight: 700,
                textAlign: "center",
                padding: "20px",
                color: colors.primary,
              }}
            >
              Please select your city and area from location first
            </Typography>
            <Box
              sx={{
                paddingY: "4px",
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
              }}
              onClick={() => {
                setIsAddress(false);
              }}
            >
              <Button sx={{ color: colors.primary, fontSize: "1rem" }}>
                OK
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default PremiumDealsCard;
const style = {
  card: {
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    borderRadius: "1rem",
    boxShadow: " 0px 15px 22px 0px rgba(0, 0, 0, 0.09)",
    justifyContent: "center",
    margin: "4px",
    transition: "transform 0.3s ease",
    ":hover": {
      transform: "scale(1.05)",
    },
    marginTop: "6px",
    backgroundColor: colors.white,
    cursor: "pointer",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: "25px",
  },
  media: {
    position: "relative",
    width: "100%",
    height: "100%",
    borderRadius: "1rem",
    // marginBottom: "0.1rem",
  },
  actualPrice: {
    fontWeight: 400,
    textDecorationLine: "line-through",
    marginTop: "14px",
    fontSize: "0.8rem",
    textAlign: "flex-end",
    marginLeft: "2px",
    color: colors.redCut,
  },
  discountedPrice: {
    fontWeight: 600,
    marginTop: "8px",
    fontSize: "1rem",
  },
  infoContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: "8px",
    marginBottom: "8px",
  },
  saveDiscount: {
    backgroundColor: colors.primary,
    color: colors.white,
    fontSize: "12px",
    fontWeight: 600,
    padding: "4px 8px",
    borderRadius: "4px",
    marginRight: "8px",
  },
  newTag: {
    backgroundImage: "",
    color: colors.white,
    fontSize: "12px",
    fontWeight: 600,
    padding: "4px 8px",
    borderRadius: "4px",
    marginRight: "8px",
  },
  serving: {
    display: "flex",
    alignItems: "center",
    backgroundColor: colors.lightGrey,
    borderRadius: "4px",
    padding: "4px 8px",
  },
  servingText: {
    fontSize: "12px",
    marginLeft: "4px",
  },
  user: {
    color: colors.primary,
    fontSize: "16px",
  },
  gap: {
    marginTop: "60px",
  },
  text: {
    paddingY: "1rem",
    color: colors.grey,
    fontSize: { xs: "11px", md: "0.9rem", lg: "1rem" },
  },
  content: {
    // marginTop: "0.5rem",
    position: "relative",
    width: "100%",
  },
  title: {
    paddingY: "8px",
    paddingLeft: "13px",
    textAlign: "flex-start",
    fontWeight: 700,
    borderRadius: 5,
    fontSize: "12px",
  },
  titleBox: {
    borderRadius: "20px",
    width: "100%",
  },
  add: {
    position: "absolute",
    bottom: 1,
    right: 1,
  },
  addBox: {
    backgroundColor: colors.primary,
    height: "40px",
    width: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: `0px 10px 15px rgba(236, 99, 0, 0.44)`,
  },
  save: {
    fontWeight: 600,
    color: colors.primary,
    fontSize: "0.9rem",
    paddingY: "4px",
    paddingX: "2px",
    borderRadius: "18px",
    // backgroundImage:
    //   "linear-gradient(109.6deg, rgba(255, 180, 24, 1) 11.2%, rgba(247, 49, 49, 1) 91.1%)",
    animation: "scaleAnimations 1s infinite",
    "@keyframes scaleAnimation": {
      "0%": {
        marginTop: "0px", // Initial scale
      },
      "50%": {
        marginTop: "-10px", // Scaled state
      },
      "100%": {
        marginTop: "0px", // Return to initial scale
      },
    },
    width: "max-content",
    // position: "absolute",
    // right: 0,
    // top: 0,
    // zIndex: 99,
  },
  discription: {
    fontWeight: 200,
    color: colors.grey,
    fontSize: "0.7rem",
    margin: "4px",
  },
  detailsContanier: {
    display: "flex",
    flexDirection: "row",
    alignItem: "center",
    justifyContent: "space-between",
    paddingX: 1,
  },
  priceContanier: {
    display: "flex",
    marginTop: 2,
    alignItem: "center",
    flexDirection: "row",
  },
};

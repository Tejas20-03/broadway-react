import React, { useState } from "react";
import cardImg from "../../../public/Assets/cardImg.jpg";
import {
  Alert,
  Box,
  Button,
  CssBaseline,
  Dialog,
  DialogTitle,
  Modal,
  Skeleton,
  Slide,
  Snackbar,
  SwipeableDrawer,
  Typography,
  styled,
} from "@mui/material";
import { colors } from "../../constant/Colors";
import Image from "next/image";
import AddIcon from "@mui/icons-material/Add";
import { Poppins } from "next/font/google";
import { MenuItemData } from "@/services/Home/types";
import { StoreDispatch, StoreState } from "@/redux/reduxStore";
import { useDispatch, useSelector } from "react-redux";
import { getOptions } from "@/services/Home/services";
import { addToCart } from "@/redux/cart/actions";
import { TransitionProps } from "@mui/material/transitions";
import { Global } from "@emotion/react";
import Premium from "../PremiumDeals/Premium";
import { grey } from "@mui/material/colors";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { motion } from "framer-motion";
import { addressesActions } from "@/redux/address/slice";

type Iprops = {
  text: string;
  price: string;
  background: string;
  src: string;
  discountedPrice: string;
  isLoading: boolean;
  id: string;
  discount: number;
  serving: number;
  isNew: boolean;
  description: string;
};
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});
const drawerBleeding = 56;
const Root = styled("div")(({ theme }) => ({}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));
interface FacebookPixelParams {
  value: number;
  currency: string;
  // Add other properties if needed
}

declare const fbq: (
  type: string,
  eventName: string
  //params: FacebookPixelParams
) => void;
const FeatureDealsCard: React.FC<Iprops> = ({
  text,
  price,
  background,
  src,
  discountedPrice,
  isLoading,
  id,
  discount,
  serving,
  isNew,
  description,
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
        dispatch(addressesActions.setAddresses({ modalOpen: newOpen }));

        setIsAddress(true);
        setOpen(false);
        return;
      }
    }
    if (newOpen) {
      getOptions(id, {}).then((data) => {
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
                ID: productId,
                ItemImage: data.Data.ItemImage,
                PaymentType: data.Data.PaymentType,
              },
            })
          );
          gtag("event", "add_to_cart", {
            items: [
              {
                id: data.Data.MenuSizesList[0].MenuItemID,
                name: data.Data.Name,
                category: data.Data.CategoryName,
                quantity: 1,
                price: data.Data.MenuSizesList[0].DiscountedPrice,
              },
            ],
          });
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
              width={window.innerWidth > 600 ? 180 : 130}
              height={window.innerWidth > 600 ? 180 : 130}
              style={{
                borderRadius: "25px",
              }}
            />
          ) : (
            <Skeleton
              width={130}
              // height={130}
              sx={{
                borderRadius: "25px",
                height: "100%",
              }}
            />
          )}
        </Box>

        <Box sx={style.content}>
          {isNew ? (
            <Box className="new-tag-feature">
              <Typography
                sx={{ fontSize: "12px" }}
                className={poppins.className}
              >
                New
              </Typography>
            </Box>
          ) : null}
          <Box sx={style.add}>
            {!isLoading ? (
              <Box sx={style.addBox}>
                <AddIcon sx={{ color: "white" }} />
              </Box>
            ) : (
              <Box
                sx={[
                  style.addBox,
                  { background: "grey !important", opacity: 0.5 },
                ]}
              >
                <Skeleton
                  variant="circular"
                  sx={{ width: "100%", height: "100%" }}
                />
              </Box>
            )}
          </Box>

          <Box sx={style.titleBox}>
            {!isLoading ? (
              <Typography
                sx={{ ...style.title, backgroundColor: background }}
                className={poppins.className}
              >
                {text}
              </Typography>
            ) : (
              <Skeleton width={"100%"} height={3} />
            )}
          </Box>
          <Box sx={style.detailsContanier}>
            {discount > 0 ? (
              <Box className="discount-percentage-tag">
                <Typography
                  className={poppins.className}
                  sx={{ fontSize: "12px" }}
                >
                  save {discount}%
                </Typography>
              </Box>
            ) : null}
            {serving && Number(serving) > 0 ? (
              <Box sx={style.serving} className="serving-count-tag ">
                <Typography
                  style={style.servingtext}
                  className={poppins.className}
                >
                  {serving}x
                </Typography>
                <PermIdentityOutlinedIcon
                  style={style.user}
                  fontSize={"small"}
                />
              </Box>
            ) : null}
          </Box>
          {description !== "" && window.innerWidth > 600 && (
            <Typography
              className={poppins.className}
              dangerouslySetInnerHTML={{ __html: description }}
              sx={style.discription}
            />
          )}
          {!isLoading ? (
            <Box sx={style.priceContanier}>
              {Number(discountedPrice) > 0 && (
                <Typography
                  sx={style.discountedPrice}
                  className={poppins.className}
                >
                  Rs.{discountedPrice}
                </Typography>
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
            <Skeleton sx={style.priceContanier} />
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
            disableAutoFocus
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

export default FeatureDealsCard;

const style = {
  card: {
    display: "flex",
    flexDirection: "row",
    borderRadius: "20px",
    boxShadow: "0px 15px 22px 0px rgba(0, 0, 0, 0.09)",
    marginLeft: { md: "2rem" },
    transition: "transform 0.3s ease",
    ":hover": {
      transform: { md: "scale(1.05)", sx: "scale(1)" },
    },
    backgroundColor: colors.white,
    maxWidth: {
      xs: "370px",
      lg: "510px",
    },
    paddingLeft: "4px",
    paddingTop: "20px",
    paddingBottom: "12px",
    paddingRight: "10px",
    minWidth: "330px",
  },
  media: {
    display: "flex",

    alignItems: "center",
  },
  actualPrice: {
    fontWeight: 400,
    textDecorationLine: "line-through",
    color: colors.redCut,
    marginTop: "16px",
    fontSize: "0.8rem",

    textAlign: "flex-end",
    marginLeft: "2px",
  },
  discountedPrice: {
    fontWeight: 600,
    marginTop: "8px",
    fontSize: "1rem",
  },
  text: {
    paddingY: "1rem",
    color: colors.grey,
    fontSize: { xs: "11px", md: "0.9rem", lg: "1rem" },
    // width: "100%", // Change to 100% for mobile
  },
  content: {
    marginLeft: "0.5rem",
    marginTop: "0.5rem",
    position: "relative",
    width: "100%",
    paddingRight: "10px",
  },
  title: {
    paddingY: { xs: "5px", md: "0.5rem" },
    width: "100%",
    paddingLeft: "6px",
    textAlign: "center",
    fontWeight: 700,
    borderRadius: 5,
    paddingRight: "10px",
  },
  titleBox: {
    borderRadius: "20px",
    width: "100%",
  },
  add: {
    position: "absolute",
    bottom: 0,
    right: 0,
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
  priceContanier: {
    display: "flex",
    alignItem: "center",
    flexDirection: "row",
    marginTop: { xs: "10px", lg: "20px" },
  },
  "@keyframes scaleAnimation": {
    "0%": {
      transform: "scale(1)", // Initial scale
    },
    "50%": {
      transform: "scale(1.1)", // Scaled state
    },
    "100%": {
      transform: "scale(1)", // Return to initial scale
    },
  },
  user: {
    color: colors.primary,
  },
  serving: {
    display: "flex",
    flexDirection: "row",
    alignItem: "center",
  },
  servingtext: {
    fontWeight: 200,
    color: colors.grey,
    fontSize: "0.9rem",
  },
  detailsContanier: {
    display: "flex",
    flexDirection: "column",
    alignItem: "center",
    // justifyContent: "space-between",
    paddingX: 1,
    marginTop: "10px",
  },
  save: {
    fontWeight: 200,
    color: colors.primary,
    marginBottom: "2px",
    fontSize: "0.9rem",
  },
  discription: {
    fontWeight: 200,
    color: colors.grey,
    fontSize: { xs: "0.7rem", lg: "1rem" },
    margin: "4px",
  },
};
declare const gtag: (
  arg0: string,
  arg1: string,
  arg2: {
    items: {
      id: any;
      name: any;
      category: any;
      quantity: number;
      price: any;
    }[];
  }
) => void;

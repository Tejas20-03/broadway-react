"use client";
import {
  Box,
  Button,
  Container,
  Dialog,
  Grid,
  List,
  Typography,
  cardActionAreaClasses,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Poppins } from "next/font/google";
import VoucherDialog from "./VoucherDialog";
import { colors } from "@/constant/Colors";
import pizza from "../../../public/p.png";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { StoreDispatch, StoreState } from "@/redux/reduxStore";
import {
  addQuantity,
  removeFromCart,
  removeQuantity,
} from "@/redux/cart/actions";
import Link from "next/link";
import { useState } from "react";
import CartDialog from "./CartDialog";
import { cartActions, cartSliceIntialState } from "@/redux/cart/slice";
import { useRouter } from "next/navigation";
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
declare const gtag: (
  arg0: string,
  arg1: string,
  arg2: {
    currency: string;
    value: string;
    items: import("@/redux/cart/slice").ProductType[];
  }
) => void;
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "500", "400", "600", "700"],
});

export default function Cart() {
  const [detailedCartDiaglog, setDetailedCartDiaglog] =
    useState<boolean>(false);
  const [active, setActive] = useState<number>(0);
  const [voucherDialog, setVoucherDialog] = useState<boolean>(false);
  const cartData = useSelector((state: StoreState) => state.cart);
  const addressData = useSelector((state: StoreState) => state.address);
  const router = useRouter();
  const dispatch = useDispatch<StoreDispatch>();
  const removeProduct = (id: number) => {
    dispatch(removeFromCart({ id: id }));
  };
  const showDetailedCart = (val: boolean) => {
    setDetailedCartDiaglog(val);
  };
  const handleShowVoucherDialog = (val: boolean) => {
    setVoucherDialog(val);
  };

  return (
    <>
      <Box sx={style.main}>
        {cartData.cartProducts.length === 0 ? (
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh',
            paddingLeft: '2.5rem',
            gap: 1,
          }}>
            <Typography
              variant="h5"
              className={poppins.className}
              sx={{
                textAlign: 'center',
                fontWeight: 400,
                color: colors.black
              }}
            >
              Your cart is
            </Typography>
            <Typography
              variant="h5"
              className={poppins.className}
              sx={{
                textAlign: 'center',
                fontWeight: 500,
                color: colors.black
              }}
            >
              Empty
            </Typography>
          </Box>
        ) : (
          <Container sx={style.container}>
            <Typography sx={style.heading} className={poppins.className}>
              CART
            </Typography>
            <Grid container columnSpacing={4}>
              <Grid item md={7} xs={12}>
                <Grid container columnSpacing={4}>
                  {cartData.cartProducts.map((item, index) => (
                    <Grid item md={5} xs={12} key={index}>
                      <Box sx={style.card}>
                        <Box sx={style.media}>
                          <Image
                            src={item.ItemImage}
                            fill={false}
                            alt="oops"
                            style={style.image}
                            width={180}
                            height={180}
                          />
                        </Box>
                        <Box sx={style.content}>
                          <Typography
                            className={poppins.className}
                            sx={{ ...style.title }}
                          >
                            {item.ProductName}
                          </Typography>
                          {item.options &&
                            item.options.length > 0 &&
                            item.options.map(
                              (option, index) =>
                                index < 2 && (
                                  <Typography
                                    sx={style.p}
                                    className={poppins.className}
                                  >
                                    <small>
                                      {option.OptionGroupName} :
                                      {option.OptionName}
                                    </small>
                                    {option.Price > 0 && (
                                      <small
                                        style={{
                                          position: "absolute",
                                          right: "10px",
                                          float: "right",
                                        }}
                                      >
                                        + Rs. {option.Price}
                                      </small>
                                    )}
                                  </Typography>
                                )
                            )}
                          <Button
                            sx={{
                              color: colors.primary,
                              paddingY: "4px",
                              paddingX: "8px",
                              position: "relative",
                              zIndex: 999,
                              textTransform: "lowercase",
                            }}
                            onClick={() => {
                              setActive(index);
                              showDetailedCart(true);
                            }}
                          >
                            Read More
                          </Button>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              width: "100%",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "start",
                                alignItems: "center",
                                gap: "5px",
                              }}
                            >
                              <a
                                className="crossButton"
                                onClick={() => removeProduct(item?.ID)}
                              >
                                <Image
                                  width={15}
                                  height={15}
                                  src={"/close.png"}
                                  alt="oops"
                                  style={{ marginRight: "8px" }}
                                />
                              </a>
                              <Box sx={style.stepperBox}>
                                <Box
                                  sx={style.minus}
                                  onClick={() =>
                                    dispatch(removeQuantity({ id: item.ID }))
                                  }
                                ></Box>
                                <Box sx={style.inputStepper}>
                                  <input
                                    className="inputStepper"
                                    type="text"
                                    data-indexvalue="0"
                                    min="0"
                                    step="1"
                                    value={item.Quantity}
                                    style={{ color: colors.primary }}
                                  />
                                </Box>
                                <Box
                                  sx={style.plus}
                                  onClick={() =>
                                    dispatch(addQuantity({ id: item.ID }))
                                  }
                                >
                                  <AddIcon
                                    sx={{
                                      color: colors.primary,
                                    }}
                                  />
                                </Box>
                              </Box>
                            </Box>
                            <Box
                              sx={{
                                display: {
                                  xl: "flex",
                                  lg: "block",
                                  xs: "flex",
                                },
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "8px",
                                width: "100%",
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: "15px",
                                  fontWeight: 700,
                                }}
                              >
                                Rs.{" "}
                                {Number(
                                  item.TotalProductPrice * Number(item.Quantity)
                                ).toFixed(2)}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>

                      {detailedCartDiaglog && active === index && (
                        <CartDialog
                          showDetailedCart={showDetailedCart}
                          detailedCartDiaglog={detailedCartDiaglog}
                          product={item}
                        />
                      )}
                    </Grid>
                  ))}
                </Grid>
                <Link
                  href={"/"}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Button sx={style.btn} className={poppins.className}>
                    ADD MORE ITEMS
                  </Button>
                </Link>
              </Grid>
              <Grid item md={5} xs={12}>
                <Box
                  sx={style.voucer}
                  onClick={() =>
                    cartData.VoucherDiscount > 0
                      ? dispatch(
                        cartActions.setCart({
                          Voucher: cartSliceIntialState.Voucher,
                          VoucherDiscount: cartSliceIntialState.VoucherDiscount,
                        })
                      )
                      : handleShowVoucherDialog(true)
                  }
                >
                  {cartData.VoucherDiscount > 0 ? (
                    <Typography sx={style.text1} className={poppins.className}>
                      Remove Voucher
                    </Typography>
                  ) : (
                    <>
                      <Typography sx={style.text1} className={poppins.className}>
                        Have a Voucher ?
                      </Typography>
                      <Typography
                        sx={{ marginTop: "3px", color: colors.primary }}
                        className={poppins.className}
                      >
                        Add your voucher to add discount
                      </Typography>
                    </>
                  )}
                </Box>
                {cartData.VoucherDiscount > 0 && (
                  <Box sx={style.finalizeItem}>
                    <Typography
                      sx={{ fontWeight: 600 }}
                      className={poppins.className}
                    >
                      Voucher
                    </Typography>
                    <Typography className={poppins.className}>
                      Rs.{" -"}
                      {Number(cartData.VoucherDiscount.toFixed(2))}
                    </Typography>
                  </Box>
                )}
                <Box sx={style.finalizeItem}>
                  <Typography
                    sx={{ fontWeight: 700 }}
                    className={poppins.className}
                  >
                    Sub Total
                  </Typography>
                  <Typography className={poppins.className}>
                    Rs.{" "}
                    {Number(
                      (
                        Number(cartData.cartSubTotal - cartData.VoucherDiscount) *
                        (1 - Number(addressData.tax) / 100)
                      ).toFixed(2)
                    )}
                  </Typography>
                </Box>
                <Box sx={style.finalizeItem}>
                  <Typography
                    sx={{ fontWeight: 700 }}
                    className={poppins.className}
                  >
                    GST ({addressData.tax}%)
                  </Typography>
                  <Typography className={poppins.className}>
                    Rs.{" "}
                    {Number(
                      (Number(cartData.cartSubTotal - cartData.VoucherDiscount) *
                        Number(addressData.tax)) /
                      100
                    )?.toFixed(2)}
                  </Typography>
                </Box>
                {Number(cartData.discount) > 0 && (
                  <Box sx={style.finalizeItem}>
                    <Typography
                      sx={{ fontWeight: 700 }}
                      className={poppins.className}
                      color={"green"}
                    >
                      Discount
                    </Typography>
                    <Typography className={poppins.className} color={"green"}>
                      Rs. {Number(cartData.discount)?.toFixed(2)}
                    </Typography>
                  </Box>
                )}
                <Box sx={style.finalizeItem}>
                  <Typography
                    sx={{ fontWeight: 700 }}
                    className={poppins.className}
                  >
                    Delivery
                  </Typography>
                  <Typography className={poppins.className}>
                    Rs {addressData.addressType === "Delivery" ? "79.00" : "0"}
                  </Typography>
                </Box>

                <Box sx={style.finalizeItem}>
                  <Typography
                    sx={{ fontWeight: 700 }}
                    className={poppins.className}
                  >
                    Total
                  </Typography>
                  <Typography className={poppins.className}>
                    Rs.{" "}
                    {Number(
                      cartData.cartSubTotal -
                      cartData.VoucherDiscount +
                      (addressData.addressType === "Delivery" ? 79 : 0)
                    )?.toFixed(2)}
                  </Typography>
                </Box>

                <Button
                  disabled={cartData.cartProducts.length <= 0}
                  sx={[style.butn]}
                  className={poppins.className}
                  onClick={() => {
                    if (cartData.cartProducts.length > 0)
                      fbq("track", "InitiateCheckout");
                    gtag("event", "begin_checkout", {
                      currency: "PKR",
                      value: Number(
                        cartData.cartSubTotal -
                        cartData.VoucherDiscount +
                        (addressData.addressType === "Delivery" ? 79 : 0)
                      )?.toFixed(2),
                      items: cartData.cartProducts,
                    });

                    router.push("/place-order");
                  }}
                >
                  Place Order
                </Button>
              </Grid>
            </Grid>
          </Container>
        )}
      </Box>
      <VoucherDialog
        voucherDialog={voucherDialog}
        handleShowVoucherDialog={handleShowVoucherDialog}
      />
    </>
  );
}
const style = {
  main: {
    width: "100%",
    height: "100%",
    position: "relative",
    paddingBottom: { lg: "0px", xs: "6rem" },
  },
  container: {
    maxWidth: { xl: "1400px" },
  },

  heading: {
    width: "100%",
    textAlign: "center",
    fontWeight: 600,
    fontSize: "21px",
    marginY: "10px",
    textTransform: "capitalize",
  },
  cartBox: {
    width: "100%",
    height: "100%",
  },
  gridCard: {
    marginTop: "30px",
    gridGap: "0px",
    gridCount: 2,
    columnWidth: "auto",
  },
  cardBox: {
    pageBreakInside: "avoid",
    breakInside: "avoid-column",
    background: colors.white,
    position: "relative",
    borderRadius: "10px",
    fontSize: "16px",
    marginTop: "8px",
    marginBottom: "8px",
    marginLeft: "8px",
    marginRight: "8px",
    boxShadow: "5px 0px 20px rgba(0, 0, 0, 0.1)",
  },
  cardContentpadding: {
    position: "relative",
    padding: "15px",
  },
  productCartImageSmall: {
    position: "relative",

    width: "auto",
    paddingTop: "68%",
    left: 0,
    margin: "-15px -15px -20px",
    zIndex: 1,
    height: "60px",

    backgroundSize: "cover",
    /* border: solid 1px #e3e3e3, */
    borderRadius: "5px 0px 5px 5px",

    backgroundColor: "#f5f5f5",
    backgroundPosition: "center",
    "::after": {
      content: "''",
      // background:' -moz-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 94%, rgba(255,255,255,1) 100%)',
      background:
        "linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 94%,rgba(255,255,255,1) 100%)",
      filter:
        "progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#ffffff',GradientType=0 )",
      position: "absolute",
      height: "100%",
      width: "100%",
      bottom: 0,
    },
  },
  contentCartCard: {
    padding: "0px",
    position: "relative",
    zIndex: 2,
    height: "70px",
    overflowY: "hidden",
  },
  text: {
    marginTop: "0px",
    marginBottom: "0px",
    paddingRight: "30px",
    fontSize: "15px",
  },
  bonus: {
    marginBottom: "-9px",
    position: "relative",
    zIndex: 1,
  },
  p: {
    color: "#747474",
    fontSize: "14px",
    margin: "5px 0 10px 0",
    paddingRight: "34px",
  },
  stepperBox: {
    display: "inline-flex",
    alignItems: "stretch",
    height: "28px",
    borderRadius: "28px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12),0 1px 2px rgba(0,0,0,0.24)",
  },
  minus: {
    width: "40px",
    borderRadius: colors.primary,

    color: colors.primary,
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    boxSizing: "border-box",
    position: "relative",
    cursor: "pointer",
    "::before": {
      content: "''",
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: colors.primary,
      borderRadius: "2px",
    },
    "::after": {
      width: "15px",
      height: "2px",
      content: "''",
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: colors.primary,
      borderRadius: "2px",
    },
  },
  inputStepper: {
    borderLeft: "1px solid rgba(0,0,0,.1)",
    borderRight: "1px solid rgba(0,0,0,.1)",
    flexShrink: 1,
    textAlign: "center",
    // borderTop: var(--f7-stepper-border-width) solid var(--f7-theme-color);
    // borderBottom: var(--f7-stepper-border-width) solid var(--f7-theme-color);
  },
  plus: {
    width: "40px",
    borderRadius: colors.primary,
    color: colors.primary,
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    boxSizing: "border-box",
    position: "relative",
    cursor: "pointer",
    "::before": {
      content: "''",
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: colors.primary,
      borderRadius: "2px",
    },
    "::after": {
      width: "15px",
      height: "2px",
      content: "''",
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: colors.primary,
      borderRadius: "2px",
    },
  },
  tag: {
    padding: "1px 5px",
    borderRadius: "3px",
    marginLeft: "5px",
    display: "inline-block",
    marginRight: "5px",
    backgroundColor: "#a5a5a51a",
    color: "#929292",
    float: "right",
  },
  btn: {
    paddingY: "8px",
    width: "100%",
    backgroundColor: "#BBBBBB",
    color: colors.white,
    marginY: "15px",
    transition: "transform 0.3s ease",
    ":hover": {
      backgroundColor: colors.primary,
      color: colors.white,
      transform: "scale(1.01)",
    },
  },
  voucer: {
    border: `2px dotted ${colors.primary}`,
    paddingY: "12px",
    color: colors.primary,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "12px",
    cursor: "pointer",
  },
  text1: {
    color: colors.primary,
    fontWeight: 700,
  },
  finalizeItem: {
    borderTop: "1px dotted grey",
    paddingY: "15px",
    width: "100%",
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
  },
  butn: {
    width: "100%",
    marginY: "15px",
    paddingY: "8px",
    color: colors.white,
    fontWeight: 700,
    boxShadow: 4,
    backgroundColor: colors.primary,

    ":hover": {
      backgroundColor: colors.primary,
      color: colors.white,
      boxShadow: 6,
    },
  },
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
  },
  image: {
    width: "100%",
    height: "40%",
    borderRadius: "25px",
  },
  media: {
    width: "100%",
    height: "100%",
    borderRadius: "1rem",
    marginBottom: "0.2rem",
  },
  content: {
    marginTop: "0.5rem",
    position: "relative",
    width: "100%",
    paddingX: "5px",
  },
  title: {
    paddingY: "8px",
    textAlign: "flex-start",
    fontWeight: 700,
    borderRadius: 5,
    fontSize: "17px",
  },
};

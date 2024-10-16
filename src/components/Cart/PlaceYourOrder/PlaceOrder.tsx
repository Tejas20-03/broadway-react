"use client";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  List,
  Modal,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Poppins } from "next/font/google";
import { colors } from "../../../constant/Colors";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import { postProcessOrder } from "@/services/Cart/services";
import { useDispatch, useSelector } from "react-redux";
import { StoreDispatch, StoreState } from "@/redux/reduxStore";
import { useRouter } from "next/navigation";
import { cartActions, cartSliceIntialState } from "@/redux/cart/slice";
interface FacebookPixelParams {
  value: number;
  currency: string;
  // Add other properties if needed
}

declare const fbq: (
  type: string,
  eventName: string,
  params: FacebookPixelParams
) => void;
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

function PlaceOrder() {
  const router = useRouter();
  const cartData = useSelector((state: StoreState) => state.cart);
  const addressData = useSelector((state: StoreState) => state.address);
  const [patmentType, setpaymentType] = useState("");
  const dispatch = useDispatch<StoreDispatch>();
  const [showAllFeildsDialog, setShowAllFeildsDialog] =
    useState<boolean>(false);
  const [formData, setFormData] = useState<{
    name: string;
    phone: string;
    remarks: string;
    payment: string;
    address: string;
    email: string;
  }>({
    name: "",
    remarks: "",
    phone: "",
    payment: "Cash",
    address: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState("");

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
  const handleConfirmOrder = () => {
    const errorPhone = validateInput(formData.phone);
    setErrors((prev) => errorPhone);

    if (
      formData.name === "" ||
      formData.payment === "" ||
      formData.phone === "" ||
      (errors !== "" && errorPhone !== "Valid Phone")
    ) {
      setShowAllFeildsDialog(true);
      return;
    }
    if (addressData.addressType === "Delivery" && formData.address === "") {
      setShowAllFeildsDialog(true);
      return;
    }

    if (errorPhone === "Valid Phone") {
      setIsLoading(true);

      postProcessOrder(
        formData.phone,
        {
          platform: "web",
          orderamount: Number(
            (
              cartData.cartSubTotal -
              cartData.VoucherDiscount * (1 - Number(addressData.tax) / 100)
            ).toFixed(2)
          ),
          paymenttype: formData.payment,
          phone: formData.phone,
          orderdata: cartData.cartProducts,
          ordertype:
            addressData.addressType === "Delivery"
              ? addressData.addressType
              : "Pickup",
          Outlet: addressData.outlet ? addressData.outlet : "  ",
          tax: Number(
            cartData.cartSubTotal -
              cartData.VoucherDiscount *
                Number(Number(addressData.tax) / 100 || 0)
          ),
          taxamount: Number(
            cartData.cartSubTotal -
              cartData.VoucherDiscount *
                Number(Number(addressData.tax) / 100 || 0)
          ),
          Remarks: formData.remarks,
          fullname: formData.name,
          cityname: addressData.city ? addressData.city : "  ",
          deliverytime: Date.now().toLocaleString(),
          deliverycharges: addressData.addressType === "Delivery" ? 79 : 0,
          Voucher: cartData.Voucher,
          discountamount: `${cartData.discount}`,
          totalamount:
            addressData.addressType === "Delivery"
              ? cartData.cartSubTotal - cartData.VoucherDiscount
              : cartData.cartSubTotal - cartData.VoucherDiscount,
          Area: addressData.area ? addressData.area : "  ",
          customeraddress: formData.address,
          Email: formData.email,
        },
        {}
      )
        .then((res) => {
          if (res?.responseType === 1) {
            if (res.URL) window.location.href = res.URL;
            else {
              fbq("track", "Purchase", {
                value: cartData.cartSubTotal - cartData.VoucherDiscount,
                currency: "USD",
              });
              gtag("event", "purchase", {
                transaction_id: res.OrderID,
                currency: "PKR",
                value: res.OrderAmount,
                items: cartData.cartProducts,
              });
              dispatch(cartActions.setCart(cartSliceIntialState));
              window.localStorage.setItem(
                "cartData",
                JSON.stringify(cartSliceIntialState)
              );

              router.push(
                `/thankyou?data=${JSON.stringify({
                  ...res,
                  name: formData.name,
                })}`
              );
              setIsLoading(false);
            }
          } else {
            alert(res?.message);
          }
        })
        .catch((err) => console.log(err, "err"))
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      setShowAllFeildsDialog(true);
    }
  };
  useEffect(() => {
    cartData.cartProducts.map((item) => {
      if (item.PaymentType) {
        setFormData({
          ...formData,
          payment: item.PaymentType,
        });
        setpaymentType(item.PaymentType);
      }
    });
  }, [cartData.cartProducts]);
  return (
    <>
      <Box sx={style.main}>
        <Box
          sx={{
            position: "absolute",
            zIndex: 99,
            top: 10,
            left: { md: 100, xs: 40 },
          }}
        >
          <Link
            href="/cart"
            style={{
              textDecoration: "none",
              listStyle: "none",
            }}
          >
            <ArrowBackIcon sx={{ fontSize: "2rem" }} />
          </Link>
        </Box>
        <Container sx={style.container}>
          <Box sx={style.textBox}>
            <Typography sx={style.heading} variant="h2">
              Place Order
            </Typography>
          </Box>
          <Grid container columnSpacing={3}>
            <Grid item md={6} xs={12}>
              <Box sx={style.leftbox}>
                <Box sx={style.dileveryInnfo}>
                  <label className={`dileveryInfoLabel ${poppins.className}`}>
                    Name
                  </label>
                  <input
                    placeholder="Type your name"
                    name="name"
                    className={`dileveryInfoInput ${poppins.className}`}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    value={formData.name}
                  ></input>
                  <label className={`dileveryInfoLabel ${poppins.className}`}>
                    Phone
                  </label>
                  <input
                    placeholder="Type your Phone no"
                    name="phone"
                    className={`dileveryInfoInput ${poppins.className}`}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone: e.target.value,
                      })
                    }
                    value={formData.phone}
                  ></input>
                  {addressData.addressType === "Delivery" && (
                    <>
                      <label
                        className={`dileveryInfoLabel ${poppins.className}`}
                      >
                        Full Address
                      </label>
                      <input
                        placeholder="Type your Full address"
                        name="address"
                        className={`dileveryInfoInput ${poppins.className}`}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            address: e.target.value,
                          })
                        }
                        value={formData.address}
                      ></input>
                    </>
                  )}
                  <label className={`dileveryInfoLabel ${poppins.className}`}>
                    Special Instruction
                  </label>
                  <input
                    placeholder="Type your Special Instrucion here..."
                    name="remarks"
                    className={`dileveryInfoInput ${poppins.className}`}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        remarks: e.target.value,
                      })
                    }
                    value={formData.remarks}
                  ></input>
                  <label className={`dileveryInfoLabel ${poppins.className}`}>
                    Email
                  </label>
                  <input
                    placeholder="Type your e-mail here..."
                    name="email"
                    className={`dileveryInfoInput ${poppins.className}`}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    value={formData.email}
                  ></input>
                </Box>
                <Box sx={style.dileveryToSIgnIn}>
                  <Box sx={style.cardContentPadding}>
                    <GpsFixedIcon
                      sx={{
                        color: colors.primary,
                        position: "absolute",
                        right: 0,
                        top: 5,
                        display: { md: "flex", xs: "none" },
                      }}
                    />
                    <Typography sx={style.normal}>
                      {addressData.addressType ? addressData.addressType : ""}
                    </Typography>
                    <Typography sx={style.normal}>
                      {addressData.addressType === "Delivery"
                        ? addressData.area
                        : addressData.outlet}
                    </Typography>
                  </Box>
                </Box>
                <Typography sx={style.payment}>PAYMENT</Typography>
                <FormControl sx={{ paddingX: "1rem" }}>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="Cash"
                    name="radio-buttons-group"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        payment: e.target.value,
                      })
                    }
                    value={formData.payment}
                  >
                    {(patmentType === "" || patmentType === "Cash") && (
                      <FormControlLabel
                        value="Cash"
                        control={<Radio sx={{ color: colors.primary }} />}
                        label="Cash"
                      />
                    )}
                    {(patmentType === "" || patmentType === "CreditCard") && (
                      <FormControlLabel
                        value="CreditCard"
                        control={<Radio sx={{ color: colors.primary }} />}
                        label="Credit/Debit Card"
                      />
                    )}
                    {(patmentType === "" || patmentType === "JazzCash") && (
                      <FormControlLabel
                        value="JazzCash"
                        control={<Radio sx={{ color: colors.primary }} />}
                        label="Jazz Cash"
                      />
                    )}
                  </RadioGroup>
                </FormControl>
              </Box>
            </Grid>
            <Grid item md={6} xs={12}>
              <Box sx={style.rightBox}>
                {cartData.cartProducts.map((item, index) => (
                  <Box sx={style.card} key={index}>
                    <Typography
                      variant="h6"
                      sx={{ paddingBottom: "10px" }}
                      fontWeight={400}
                    >
                      {item.ProductName}{" "}
                      <small className="smallTextMul">{item.Quantity}x</small>
                    </Typography>
                    {item.options.map((option) => (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          width: "100%",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography sx={style.font}>
                          {option.OptionGroupName}: {option.OptionName} X{" "}
                          {option.Quantity}
                        </Typography>
                        {option.Price > 0 && (
                          <Typography sx={style.fontMIni}>
                            + Rs {option.Price * Number(option.Quantity)}
                          </Typography>
                        )}
                      </Box>
                    ))}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography sx={style.font}>Total</Typography>
                      <Typography sx={style.fontMIni}>
                        + Rs {item.TotalProductPrice}
                      </Typography>
                    </Box>
                  </Box>
                ))}
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
                    sx={{ fontWeight: 600 }}
                    className={poppins.className}
                  >
                    Sub Total
                  </Typography>
                  <Typography className={poppins.className}>
                    Rs.{" "}
                    {Number(
                      (
                        Number(
                          cartData.cartSubTotal - cartData.VoucherDiscount
                        ) *
                        (1 - Number(addressData.tax) / 100)
                      ).toFixed(2)
                    )}
                  </Typography>
                </Box>
                <Box sx={style.finalizeItem}>
                  <Typography
                    sx={{ fontWeight: 600 }}
                    className={poppins.className}
                  >
                    GST ({addressData.tax}%)
                  </Typography>
                  <Typography className={poppins.className}>
                    Rs.{" "}
                    {Number(
                      (cartData.cartSubTotal * Number(addressData.tax)) / 100
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
                    sx={{ fontWeight: 600 }}
                    className={poppins.className}
                  >
                    Delivery
                  </Typography>
                  <Typography className={poppins.className}>
                    Rs. {addressData.addressType === "Delivery" ? "79" : "0"}
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
                  sx={style.butn}
                  className={poppins.className}
                  onClick={handleConfirmOrder}
                  disabled={isLoading || cartData.cartProducts.length <= 0}
                >
                  {isLoading ? (
                    <CircularProgress
                      size={25}
                      sx={{
                        color: colors.white,
                      }}
                    />
                  ) : (
                    "Place Order"
                  )}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {showAllFeildsDialog && (
        <>
          <Modal
            sx={{
              display: "flex",
              alignItems: "center",
              marginX: "12px",
              border: "none",
              justifyContent: "center",
            }}
            open={showAllFeildsDialog}
            onClose={() => {
              setShowAllFeildsDialog(false);
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            disableAutoFocus
          >
            <Box sx={{ border: "none", background: "white", borderRadius: 2 }}>
              <Typography
                className={poppins.className}
                sx={{
                  fontWeight: 700,
                  textAlign: "left",
                  paddingX: "20px",
                  color: colors.black,
                  paddingTop: "20px",
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
                {errors !== "" && errors !== "Valid Phone"
                  ? errors
                  : "Please fill all fields."}
              </Typography>
              <Box
                sx={{
                  paddingY: "4px",
                  width: "100%",
                  display: "flex",
                  justifyContent: "end",
                }}
                onClick={() => {
                  setShowAllFeildsDialog(false);
                }}
              >
                <Button sx={{ color: colors.primary, fontSize: "1rem" }}>
                  OK
                </Button>
              </Box>
            </Box>
          </Modal>
        </>
      )}
    </>
  );
}

export default PlaceOrder;

const style = {
  main: {
    width: "100%",
    height: "100%",
    position: "relative",
    paddingBottom: { lg: "0px", xs: "6rem" },
  },
  container: {
    maxWidth: { lg: "1200px" },
  },
  leftbox: {
    position: "relative",
    width: "100%",
  },
  rightBox: {
    padding: { xs: "10px" },
  },
  heading: {
    letterSpacing: "normal",
    fontWeight: 700,
    fontSize: { lg: "30px", xs: "20px" },
    textAlign: "center",

    color: colors.haeding,
  },
  textBox: {
    width: "100%",
    justifyContent: "center",
    paddingY: "16px",
    position: "relative",
  },
  dileveryInnfo: {
    padding: "5px 10px 20px",
    // boxShadow: "3px 3px 30px #07070721",
    margin: "10px",
    borderRadius: "10px",
    // border: "solid 1px #bebebe66",
  },
  dileveryToSIgnIn: {
    padding: "5px 10px ",
    boxShadow: "3px 3px 30px #07070721",
    margin: "10px 12px", // Updated margin value
    borderRadius: "10px",
    border: "none", // Removed border property from previous styles
    background: "#b6b52f12",
    fontSize: "12px", // Added font-size property
    lineHeight: "1",
  },
  cardContentPadding: {
    position: "relative",
    paddingX: "15px",
  },
  normal: {
    fontSize: "12px",
  },
  payment: {
    letterSpacing: "normal",
    fontWeight: 600,
    fontSize: { lg: "20px", xs: "20px" },
    textAlign: "left",
    color: colors.haeding,
    paddingX: "1rem",
  },
  card: {
    padding: "8px",
    // background: "#fff",
    position: "relative",
    borderRadius: "10px",
    marginTop: "8px",
    marginBottom: "8px",

    boxShadow: "5px 0px 20px rgba(0, 0, 0, 0.1)",
  },
  font: {
    fontSize: "12px",
    paddingY: "3px",
    width: "80%",
  },
  fontMIni: {
    fontSize: "9px",
  },
  finalizeItem: {
    borderTop: "1px dotted grey",
    paddingY: "15px",
    width: "100%",
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
    paddingX: "16px",
  },
  butn: {
    width: "100%",
    marginY: "15px",
    paddingY: "8px",
    backgroundColor: colors.primary,
    color: colors.white,
    fontWeight: 700,
    boxShadow: 4,
    ":hover": {
      backgroundColor: colors.primary,
      color: colors.white,
      boxShadow: 6,
    },
  },
  back: {
    position: "absolute",
    top: 18,
    left: 100,
    zIndex: 99,
  },
};
declare const gtag: (
  arg0: string,
  arg1: string,
  arg2: {
    transaction_id: string;
    currency: string;
    value: string;
    items: import("@/redux/cart/slice").ProductType[];
  }
) => void;

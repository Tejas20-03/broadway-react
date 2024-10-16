import { Box, Dialog, Grid, List, Typography } from "@mui/material";
import { Poppins } from "next/font/google";
import Image from "next/image";
import React from "react";
import { colors } from "@/constant/Colors";
import { ProductType } from "@/redux/cart/slice";
import { useDispatch } from "react-redux";
import { addQuantity, removeQuantity } from "@/redux/cart/actions";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import { StoreDispatch } from "@/redux/reduxStore";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "500", "400", "600", "700"],
});

type Iprops = {
  showDetailedCart: (value: boolean) => void;
  detailedCartDiaglog: boolean;
  product: ProductType;
};

const CartDialog: React.FunctionComponent<Iprops> = ({
  showDetailedCart,
  detailedCartDiaglog,
  product,
}) => {
  const dispatch = useDispatch<StoreDispatch>();
  return (
    <>
      <Dialog
        onClose={() => showDetailedCart(false)}
        open={detailedCartDiaglog}
        sx={{ height: "100%" }}
      >
        <List sx={{ pt: 0 }}>
          <Box sx={style.cardBox}>
            <Box
              sx={{
                position: "absolute",
                right: 10,
                top: 10,
                zIndex: 99,
              }}
              onClick={() => showDetailedCart(false)}
            >
              <CancelIcon sx={{ color: colors.primary }} />
            </Box>
            <Box sx={style.cardContentpadding}>
              <Box
                sx={[
                  style.productCartImageSmall,
                  {
                    backgroundImage: `url(${product.ItemImage})`,
                  },
                ]}
              ></Box>
              <Box sx={style.contentCartCard}>
                <Typography
                  variant="h3"
                  sx={style.text}
                  className={poppins.className}
                >
                  {product.CategoryName}
                </Typography>
                <Typography
                  variant="h3"
                  sx={style.text}
                  className={poppins.className}
                >
                  {product.ProductName}
                </Typography>
                {product.options &&
                  product.options.length > 0 &&
                  product.options.map((option, index) => (
                    <Typography sx={style.p} className={poppins.className}>
                      <small>
                        {option.OptionGroupName} :{option.OptionName} x
                        {option.Quantity}
                      </small>
                      {option.Price > 0 && (
                        <small
                          style={{
                            position: "absolute",
                            right: "10px",
                            float: "right",
                          }}
                        >
                          + Rs. {option.Price * Number(option.Quantity)}
                        </small>
                      )}
                    </Typography>
                  ))}
              </Box>

              <Box sx={style.bonus}>
                <Grid container columnSpacing={3}>
                  <Grid item lg={7}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "start",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      {/* <a
                        className="crossButton"
                        onClick={() =>
                          dispatch(removeQuantity({ id: product.ID }))
                        }
                      >
                        <Image
                          width={15}
                          height={15}
                          src={"/close.png"}
                          alt="oops"
                          style={{ marginRight: "8px" }}
                        />
                      </a> */}
                      <Box sx={style.stepperBox}>
                        <Box
                          sx={style.minus}
                          onClick={() =>
                            dispatch(removeQuantity({ id: product.ID }))
                          }
                        ></Box>
                        <Box sx={style.inputStepper}>
                          <input
                            className="inputStepper"
                            type="text"
                            data-indexvalue="0"
                            min="0"
                            step="1"
                            value={product.Quantity}
                            style={{ color: colors.primary }}
                          />
                        </Box>
                        <Box
                          sx={style.plus}
                          onClick={() =>
                            dispatch(addQuantity({ id: product.ID }))
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
                  </Grid>
                  <Grid item lg={5}>
                    <Box
                      sx={{
                        display: {
                          xl: "flex",
                          lg: "flex",
                          xs: "flex",
                        },
                        alignItems: "center",
                        justifyContent: "end",
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
                        Rs{" "}
                        {Number(
                          product.TotalProductPrice * Number(product.Quantity)
                        ).toFixed(2)}
                      </Typography>
                      {/* <Typography sx={{ fontSize: "12px" }}>Rs 1099</Typography> */}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </List>
      </Dialog>
    </>
  );
};

export default CartDialog;
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
    // zIndex: 2,
    // height: "70px",
    // overflowY: "hideen",
  },
  text: {
    marginTop: "0px",
    marginBottom: "0px",
    paddingRight: "30px",
    fontSize: "15px",
  },
  bonus: {
    paddingTop: "10px",
    marginTop: " 5px",
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
};

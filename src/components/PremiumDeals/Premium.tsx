import styled from "@emotion/styled";
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Modal,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { MouseEventHandler, useEffect, useState } from "react";
import Image from "next/image";
import { colors } from "@/constant/Colors";
import TextOfPremium from "./TextOfPremium";
import SelectOptions from "./SelectOptions";
import { Poppins } from "next/font/google";
import { MenuItemData } from "@/services/Home/types";
import { useDispatch, useSelector } from "react-redux";
import { StoreDispatch, StoreState } from "@/redux/reduxStore";
import { addQuantity, addToCart, removeQuantity } from "@/redux/cart/actions";
import CancelIcon from "@mui/icons-material/Cancel";
import { OptionsType, ProductType } from "@/redux/cart/slice";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { Close } from "@mui/icons-material";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});
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
type Iprops = {
  onClick: () => void;
  id: string;
  data: MenuItemData;
  setData: (data: MenuItemData) => void;
  setProductId: (value: number) => void;
  productId: number;
  setSelectedIndex: (value: number) => void;
  selectedIndex: number;
};

const Premium: React.FC<Iprops> = ({
  onClick,
  id,
  data,
  setData,
  setProductId,
  productId,
  setSelectedIndex,
  selectedIndex,
}) => {
  const dispatch = useDispatch<StoreDispatch>();
  const [totalProductPrice, setTotalProductPrice] = useState<number>(0);
  const cartData = useSelector((state: StoreState) => state.cart);
  const [required, setRequired] = useState<boolean>(false);
  const [requireding, setRequireding] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  const router = useRouter();

  const [options, setOptions] = useState<OptionsType[]>([]);
  const addProductToCart = () => {
    const filteredArray = data?.MenuSizesList[
      selectedIndex
    ].FlavourAndToppingsList.filter((item) => item.IsMultiple === false);
    let count = 0;
    filteredArray.forEach((groupName) => {
      options.forEach((options) => {
        if (options.OptionGroupName === groupName.Name) {
          count++;
        }
      });
    });
    if (filteredArray.length !== count) {
      setRequired(true);
      setRequireding(true);
    } else {
      setRequired(false);
      setRequireding(false);
      if (data) {
        dispatch(
          addToCart({
            products: {
              ItemID: data.ID,
              ProductName: data.Name,
              Quantity: 1,
              ItemImage: data.ItemImage,
              CategoryName: data.CategoryName,
              MinimumDelivery: String(data.MinimumDelivery),
              options: options,
              SizeID: data?.MenuSizesList[selectedIndex]?.ID,
              Price: data?.MenuSizesList[selectedIndex]?.DiscountedPrice,
              TotalProductPrice: totalProductPrice,
              discountGiven:
                data?.MenuSizesList[selectedIndex]?.ActualPrice > 0
                  ? data?.MenuSizesList[selectedIndex]?.Discount
                  : 0,
              ID: Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000,
              PaymentType: data.PaymentType,
            },
          })
        );

        setOpenSnackbar(!openSnackbar);
        fbq("track", "AddToCart");
        gtag("event", "add_to_cart", {
          items: [
            {
              id: data.ID,
              name: data.Name,
              category: data.CategoryName,
              quantity: 1,
              price: totalProductPrice,
            },
          ],
        });
        setTimeout(() => {
          onClick();
          router.push("./cart");
        }, 1000);
      }
    }
  };
  const addOptions = (
    optionData: OptionsType,
    action: "add" | "remove",
    Ids: number[],
    canMultiple: boolean
  ) => {
    const foundIndex = options.findIndex(
      (obj) => obj.OptionID === optionData.OptionID
    );

    if (action === "add") {
      if (canMultiple) {
        // If canMultiple is true, simply add the option
        if (foundIndex === -1) {
          setOptions([...options, optionData]);
        } else {
          const filteredOptions = options.filter(
            (opt) => opt.OptionID !== optionData.OptionID
          );
          setOptions(filteredOptions);
        }
      } else {
        // If canMultiple is false, remove options with matching OptionID from Ids
        const filteredOptions = options.filter(
          (opt) => !Ids.includes(opt.OptionID)
        );

        if (foundIndex === -1) {
          setOptions([...filteredOptions, optionData]);
        } else {
          const filteredOptions = options.filter(
            (opt) => opt.OptionID !== optionData.OptionID
          );
          setOptions(filteredOptions);
        }
      }
    } else if (action === "remove") {
      // If action is "remove," remove the option if it's found
      if (foundIndex !== -1) {
        const filteredOptions = options.filter(
          (opt) => opt.OptionID !== optionData.OptionID
        );
        setOptions(filteredOptions);
      } else {
        const filteredOptions = options.filter(
          (opt) => !Ids.includes(opt.OptionID)
        );

        if (foundIndex === -1) {
          setOptions([...filteredOptions, optionData]);
        }
      }
    }
  };
  const increaseQuantity = (id: number) => {
    // Create a new array with the updated values
    const updatedOptions = options.map((item) => {
      if (item.OptionID === id) {
        return {
          ...item,
          Quantity: item.Quantity + 1,
        };
      }
      return item;
    });

    setOptions(updatedOptions);
  };
  const decreaseQuantity = (id: number) => {
    // Create a new array with the updated values
    const updatedOptions = options.map((item) => {
      if (item.OptionID === id) {
        const newQuantity = item.Quantity - 1;
        // If the new quantity is greater than or equal to 1, update the item
        if (newQuantity >= 1) {
          return {
            ...item,
            Quantity: newQuantity,
          };
        }
      }
      return item;
    });

    // Filter out items with quantity less than 1
    const filteredOptions = updatedOptions.filter((item) => item.Quantity >= 1);

    setOptions(filteredOptions);
  };
  const calculateTotal = () => {
    let optionsTotal = 0;
    if (options && options.length > 0) {
      options.forEach((item) => (optionsTotal += item.Price * item.Quantity));
    }
    setTotalProductPrice(
      Number(
        optionsTotal +
          Number(data?.MenuSizesList[selectedIndex]?.DiscountedPrice)
      )
    );
  };

  useEffect(() => {
    calculateTotal();
  }, [options]);
  useEffect(() => {
    setOptions([]);
  }, [selectedIndex]);

  return (
    <>
      <Box sx={style.small}>
        <Box
          sx={{
            position: "fixed",
            bottom: "33px",
            width: "45px",
            height: "45px",
            borderRadius: "25px",
            boxShadow: "0px 10px 15px 0px rgba(48, 51, 79, 0.29)",
            backgroundColor: colors.white,
            right: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 99,
          }}
          onClick={(e) => onClick()}
        >
          <Close sx={{ fontSize: "30px", color: colors.primary }} />
        </Box>
        <Box sx={style.mainBox}>
          <Box
            sx={[
              style.bottomAddToCart,
              {
                width: "220px",
                paddingLeft: "10px",
              },
            ]}
          >
            <Box
              sx={style.AddToCart}
              onClick={() => {
                addProductToCart();
              }}
            >
              <Typography
                sx={[style.cartText, { marginRight: "36px" }]}
                className={poppins.className}
              >
                Add To Order
              </Typography>
              <Box
                sx={[style.orderIconBox]}
                onClick={(e) => {
                  e.stopPropagation();
                  if (cartData.cartProducts.length > 0) router.push("/cart");
                }}
              >
                {cartData.cartProducts.length > 0 && (
                  <Box sx={style.badge}>
                    <Typography className={poppins.className}>
                      {cartData.cartProducts.length}
                    </Typography>
                  </Box>
                )}
                <Image alt="cart" width={20} height={20} src="/Vector.svg" />
              </Box>
            </Box>
          </Box>

          <Container sx={{ width: "100%", padding: 0 }}>
            <Box
              sx={[
                style.btnBox,
                {
                  backgroundColor: "rgba(255,255,255,0.5)",
                },
              ]}
              onClick={(e) => onClick()}
            >
              <Button sx={style.backButton} className={poppins.className}>
                <Image
                  src="/arrow-right.svg"
                  alt="oops"
                  width={20}
                  height={20}
                />
                Back
              </Button>
            </Box>
            {/* <Box sx={style.heartBox}>
              <Image src="/heart1.svg" alt="oops" width={24} height={24} />
            </Box> */}
            <Box sx={style.imgBox}>
              <Image
                src={data?.ItemImage ? data.ItemImage : "/p-img.png"}
                alt="oops"
                width={400}
                height={348}
              />
            </Box>
          </Container>
        </Box>
        <Container sx={style.containerText}>
          <Box sx={style.section}>
            <Box sx={style.MargeritaBox}>
              <Typography sx={style.cardText} className={poppins.className}>
                {data?.Name}
              </Typography>
            </Box>
            <TextOfPremium
              description={data?.Description ? data?.Description : ""}
              price={
                data?.MenuSizesList[selectedIndex]?.DiscountedPrice
                  ? data?.MenuSizesList[selectedIndex]?.DiscountedPrice
                  : 0
              }
              cutPrice={
                data?.MenuSizesList[selectedIndex]?.MinDeliveryPrice
                  ? data?.MenuSizesList[selectedIndex]?.MinDeliveryPrice
                  : 0
              }
            />
          </Box>
        </Container>
        <SelectOptions
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          sizeList={data?.MenuSizesList ? data?.MenuSizesList : []}
          addOptions={addOptions}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          addedOptions={options}
          required={required}
        />
      </Box>
      <Box sx={style.large} className="ppLarge">
        <Grid container sx={{ position: "relative" }}>
          <Box sx={style.btnBox} onClick={(e) => onClick()}>
            <Button sx={style.backButton} className={poppins.className}>
              <CancelIcon sx={{ fontSize: "2.1rem" }} />
            </Button>
          </Box>
          {/* <Box sx={style.heartBox}>
            <Image src="/heart1.svg" alt="oops" width={24} height={24} />
          </Box> */}
          <Grid
            item
            lg={4}
            sx={{ backgroundColor: colors.white, width: "100%" }}
          >
            <Box
              sx={[
                style.imgBox,
                {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                },
              ]}
            >
              <Image
                src={data?.ItemImage ? data.ItemImage : "/p-img.png"}
                alt="oops"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "10px",
                  marginLeft: "8px",
                }}
                width={270}
                height={270}
              />
            </Box>
          </Grid>
          <Grid item lg={8} p={"16px"} position={"relative"} width={"100%"}>
            <Box
              sx={{
                width: "100%",
                height: "500px",
                overflowY: "scroll",
                position: "relative",
              }}
            >
              <Typography className={poppins.className} sx={style.cardTextL}>
                {data?.Name}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                {data?.MenuSizesList[selectedIndex]?.DiscountedPrice > 0 && (
                  <Typography
                    className={poppins.className}
                    sx={style.priceLarge}
                  >
                    RS .
                    {data?.MenuSizesList[selectedIndex]?.DiscountedPrice
                      ? data?.MenuSizesList[selectedIndex]?.DiscountedPrice
                      : 0}
                  </Typography>
                )}
                {data?.MenuSizesList[selectedIndex]?.MinDeliveryPrice > 0 && (
                  <Typography
                    className={poppins.className}
                    sx={style.priceCutPrice}
                  >
                    RS .
                    {data?.MenuSizesList[selectedIndex]?.MinDeliveryPrice
                      ? data?.MenuSizesList[selectedIndex]?.MinDeliveryPrice
                      : 0}
                  </Typography>
                )}
              </Box>

              <Typography className={poppins.className} sx={style.descLarge}>
                {data?.Description ? data?.Description : ""}
              </Typography>
              <SelectOptions
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
                sizeList={data?.MenuSizesList ? data?.MenuSizesList : []}
                addOptions={addOptions}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                addedOptions={options}
                required={required}
              />
            </Box>
            <Box
              sx={[
                style.bottomAddToCart,
                {
                  width: "200px",
                },
              ]}
            >
              <Box
                sx={style.AddToCart}
                onClick={() => {
                  addProductToCart();
                }}
              >
                <Typography sx={[style.cartText]} className={poppins.className}>
                  Add To Order
                </Typography>

                <Box
                  sx={style.orderIconBox}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (cartData.cartProducts.length > 0) router.push("/cart");
                  }}
                >
                  {cartData.cartProducts.length > 0 && (
                    <Box sx={style.badge}>
                      <Typography className={poppins.className}>
                        {cartData.cartProducts.length}
                      </Typography>
                    </Box>
                  )}
                  <Image alt="cart" width={20} height={20} src="/Vector.svg" />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Modal
        // className="premiumDialog"
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginX: "12px",
          border: "none",
        }}
        disableAutoFocus
        open={requireding}
        onClose={() => {
          setRequireding(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ border: "none", background: "white", borderRadius: 2 }}>
          <Typography
            className={poppins.className}
            sx={{
              fontWeight: 700,
              textAlign: "left",
              padding: "20px",
              color: colors.black,
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
            Please select Options
          </Typography>
          <Box
            sx={{
              paddingY: "4px",
              width: "100%",
              display: "flex",
              justifyContent: "end",
            }}
            onClick={() => {
              setRequireding(false);
            }}
          >
            <Button sx={{ color: colors.primary, fontSize: "1rem" }}>OK</Button>
          </Box>
        </Box>
      </Modal>
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
    </>
  );
};

export default Premium;
const style = {
  small: {
    display: { lg: "none", xs: "block" },
    width: "100%",
    position: "relative",
  },
  large: {
    display: { lg: "flex", xs: "none" },
    width: "100%",
    position: "relative",
    height: "100%",
  },
  mainBox: {
    width: "100%",
    backgroundColor: "#EDDAC5",
    position: "relative",
  },
  container: {
    maxWidth: { lg: "900px", sm: "700px", xs: "300px" },
    backgroundColor: "#EDDAC5",
    height: "100%",
  },
  containerText: {
    maxWidth: { lg: "900px", sm: "700px", xs: "390px" },
  },
  container1: {
    maxWidth: { lg: "2830px" },
    // position: "absolute",
    // bottom: { lg: -30, xs: "-30px" },
    width: "100%",
    left: 0,
    display: "flex",
    justfiyContent: "center",
  },
  imgBox: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // paddingTop: { lg: "0rem", xs: "5rem" },
  },
  MargeritaBox: {
    height: "40px",
    borderRadius: "15px",
    backgroundColor: "#ffc500",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 4px 23px 0px rgba(244,178,0,0.55)",
  },
  cardText: {
    color: colors.white,
    paddingY: { md: "2rem", xs: "0px" },
    textAlign: "center",
    fontWeight: 600,
    fontSize: { lg: "2rem", xs: "20px" },
    lineHeight: "30px",
  },
  cardTextL: {
    color: "#30334F",
    paddingY: { md: "2rem", xs: "0px" },
    textAlign: "left",
    fontWeight: 600,
    fontSize: { lg: "2rem", xs: "20px" },
    paddingX: "2rem",
    lineHeight: "30px",
    marginTop: "20px",
  },
  priceLarge: {
    paddingLeft: "2rem",
    color: colors.primary,
    marginTop: "5px",
    marginBottom: "10px",
    fontWeight: 700,
    fontSize: { lg: "2rem", md: "1.5rem", xs: "18px" },
    lineHeight: { xs: "normal", md: "55px" },
  },
  priceCutPrice: {
    color: colors.redCut,
    marginTop: "8px",
    marginBottom: "10px",
    fontWeight: 700,
    fontSize: { lg: "1rem", md: "1rem", xs: "16px" },
    lineHeight: { xs: "normal", md: "55px" },
    textDecorationLine: "line-through",
    marginLeft: "4px",
  },
  descLarge: {
    color: "#30334F",
    paddingX: "2rem",
    fontWeight: 400,
    fontSize: { lg: "2rem", md: "1.5rem", xs: "1rem" },
    lineHeight: { xs: "normal", md: "40px", xl: "62px" },
  },
  btnBox: {
    position: "absolute",
    top: "20px",
    right: { lg: "30px " },
    left: { xs: "10px ", lg: "0px" },
    display: "flex",
    alignItems: "center",
    zIndex: 99,
    borderRadius: 10,
  },
  backButton: {
    color: colors.black,
    fontWeight: 400,
    fontSize: { lg: "1.2rem", md: "1rem", xs: "14px" },
    textTransform: "capitalize",
  },
  heartBox: {
    position: "absolute",
    top: "18px",
    right: "35px",
    background: "#F4F2FC",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "9px",
  },
  heartBox1: {
    position: "absolute",
    top: "18px",
    left: "16px",
    background: "#F4F2FC",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "9px",
  },
  bottomAddToCart: {
    position: { xs: "fixed", lg: "relative" },
    bottom: { xs: "20px", lg: "0px" },
    left: { xs: "17%", lg: "0px" },
    background: colors.bottomCart,
    color: colors.white,
    height: "50px",
    zIndex: 99,
    borderRadius: "30px",
    boxShadow: "0px 10px 15px 0px rgba(48, 51, 79, 0.29)",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: "14px",
    marginTop: "8px",
    marginBottom: "10px",
    paddingLeft: "4px",
    transition: "width 0.5s ease-in-out",
  },
  quantityPicker: {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    paddingX: "18px",
  },
  picker: {
    color: colors.white,
    fontWeight: 600,
    fontSize: "16px",
    cursor: "pointer",
  },
  AddToCart: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "3px",
    gap: "14px",
    transition: "all ease-in-out 2s",
    cursor: "pointer",
    marginLeft: { xs: "0px", lg: "22px" },
  },
  cartText: {
    color: colors.white,
    fontWeight: 600,
    fontSize: "16px",
  },
  orderIconBox: {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    background: colors.primary,
  },
  section: {
    marginTop: { lg: "2rem", md: "1.5rem", xs: "16px" },
  },
  badge: {
    position: "absolute",
    top: "0px",
    right: "0px",
    background: colors.white,
    color: colors.primary,
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
declare const gtag: (
  arg0: string,
  arg1: string,
  arg2: {
    items: { id: any; name: any; category: any; quantity: any; price: any }[];
  }
) => void;

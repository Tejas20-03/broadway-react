"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Poppins } from "next/font/google";
import { colors } from "@/constant/Colors";
import { checkVoucher } from "@/services/Cart/services";
import { StoreDispatch, StoreState } from "@/redux/reduxStore";
import { useDispatch, useSelector } from "react-redux";
import { Message } from "@mui/icons-material";
import { Alert, Snackbar, Typography } from "@mui/material";
import { cartActions } from "@/redux/cart/slice";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
});

type Iprops = {
  voucherDialog: boolean;
  handleShowVoucherDialog: (value: boolean) => void;
};

const FormDialog: React.FC<Iprops> = ({
  voucherDialog,
  handleShowVoucherDialog,
}) => {
  const cartData = useSelector((state: StoreState) => state.cart);
  const addressData = useSelector((state: StoreState) => state.address);
  const dispatch = useDispatch<StoreDispatch>();
  const [voucher, setVoucher] = useState<string>("");
  const [voucherError, setVoucherError] = useState<string>("");
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const handleCheckVoucher = async () => {
    if (voucher !== "" && addressData.city !== null) {
      const voucherResponse = await checkVoucher(
        voucher,
        addressData.city,
        cartData.cartSubTotal +
          (addressData.addressType === "Delivery" ? 79 : 0),
        {}
      );
      if (voucherResponse?.Message && voucherResponse?.Message !== "") {
        setVoucherError(voucherResponse?.Message);
      } else {
        handleShowVoucherDialog(false);
        dispatch(
          cartActions.setCart({
            Voucher: voucher,
            VoucherDiscount: voucherResponse?.VoucherAmount,
          })
        );
        setOpenSnackbar(true);
      }
    }
  };
  return (
    <div>
      <Dialog
        className={poppins.className}
        open={voucherDialog}
        onClose={() => handleShowVoucherDialog(false)}
      >
        <DialogTitle className={poppins.className}> Apply voucher</DialogTitle>
        <DialogContent>
          <DialogContentText className={poppins.className}>
            Have a voucher? Type your voucher to apply discount.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            variant="standard"
            sx={{
              ".css-l4u8b9-MuiInputBase-root-MuiInput-root:after": {
                borderBottom: `2px solid ${colors.primary}`,
              },
            }}
            onChange={(e) => setVoucher(e.target.value)}
            value={voucher}
          />
          {voucherError && (
            <Typography sx={{ color: "red" }}>*{voucherError}</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            className={poppins.className}
            sx={{ color: colors.primary }}
            onClick={() => handleShowVoucherDialog(false)}
          >
            Cancel
          </Button>
          <Button
            className={poppins.className}
            sx={{ color: colors.primary }}
            onClick={handleCheckVoucher}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
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
          Voucher applied successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};
export default FormDialog;

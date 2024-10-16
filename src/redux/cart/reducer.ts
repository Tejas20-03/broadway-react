import { PayloadAction } from "@reduxjs/toolkit";
import { CartSliceType } from "./slice";

type stateType = CartSliceType;
type actionType = PayloadAction<Partial<CartSliceType>>;

export const setCart = (state: stateType, action: actionType) => {
  const {
    cartProducts,
    cartSubTotal,
    cartTotal,
    discount,
    Voucher,
    VoucherDiscount,
    search,
  } = action.payload;

  state.cartProducts =
    cartProducts !== undefined ? cartProducts : state.cartProducts;
  state.cartSubTotal =
    cartSubTotal !== undefined ? cartSubTotal : state.cartSubTotal;
  state.cartTotal = cartTotal !== undefined ? cartTotal : state.cartTotal;

  state.discount = discount !== undefined ? discount : state.discount;
  state.VoucherDiscount =
    VoucherDiscount !== undefined ? VoucherDiscount : state.VoucherDiscount;
  state.Voucher = Voucher !== undefined ? Voucher : state.Voucher;
  state.search = search !== undefined ? search : state.search;
};

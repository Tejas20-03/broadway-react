import { MenuItemData } from "@/services/Home/types";
import { createSlice } from "@reduxjs/toolkit";
import { setCart } from "./reducer";
export type CartSliceType = {
  cartTotal: number;
  cartSubTotal: number;
  discount: number;
  cartProducts: ProductType[];
  Voucher: string;
  VoucherDiscount: number;
  search: string;
};

export const cartSliceIntialState: CartSliceType = {
  cartTotal: 0,
  cartSubTotal: 0,
  discount: 0,
  cartProducts: [],
  Voucher: "",
  VoucherDiscount: 0,
  search: "",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: cartSliceIntialState,
  reducers: { setCart },
});

export const cartActions = cartSlice.actions;

export type ProductType = {
  ItemID: number;
  ProductName: string;
  Quantity: number;
  ItemImage: string;
  CategoryName: string;
  MinimumDelivery: string;
  options: OptionsType[];
  SizeID: number;
  Price: number;
  TotalProductPrice: number;
  discountGiven: number;
  ID: number;
  PaymentType: string;
};

export type OptionsType = {
  OptionID: number;
  OptionName: string;
  OptionGroupName: string;
  Price: number;
  Quantity: number;
};

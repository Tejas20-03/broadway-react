import { createSlice } from "@reduxjs/toolkit";
import { setAddresses } from "./reducer";

export const addressesSliceIntialState: AddressesSliceType = {
  city: null,
  addressType: null,
  area: null,
  outlet: null,
  tax: null,
  search: null,
  modalOpen: false,
};

const addressesSlice = createSlice({
  name: "addresses",
  initialState: addressesSliceIntialState,
  reducers: { setAddresses },
});

export default addressesSlice;
export const addressesActions = addressesSlice.actions;
//TYPES
export type AddressesSliceType = {
  city: string | null;
  addressType: "Delivery" | "Takeaway" | null;
  area: string | null;
  outlet: string | null;
  tax: string | null;
  search: string | null;
  modalOpen: boolean;
};

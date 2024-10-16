import { createAsyncThunk } from "@reduxjs/toolkit";
import { AsyncThunkConfig } from "../reduxStore";
import { MenuItemData } from "@/services/Home/types";
import _ from "lodash";
import { ProductType, cartActions } from "./slice";
import { json } from "stream/consumers";
const CartThunks = {
  addToCart: "cart/addToCart",
  removeFromCart: "cart/removeFromCart",
  addQuantity: "cart/addQuantity",
  removeQuantity: "cart/removeQuantity",
};

export const addToCart = createAsyncThunk<
  string,
  { products: ProductType },
  AsyncThunkConfig
>(CartThunks.addToCart, async ({ products }, { dispatch, getState }) => {
  const message = "added";
  const cartData = getState().cart;
  let processCartData = _.cloneDeep(cartData);
  processCartData.cartProducts.push(products);
  processCartData.cartSubTotal =
    processCartData.cartSubTotal + products.TotalProductPrice;
  processCartData.discount =
    Number(processCartData.discount || 0) + Number(products.discountGiven);

  dispatch(cartActions.setCart(processCartData));
  window.localStorage.setItem("cartData", JSON.stringify(processCartData));
  return message;
});

export const removeFromCart = createAsyncThunk<
  string,
  { id: number },
  AsyncThunkConfig
>(CartThunks.addToCart, async ({ id }, { dispatch, getState }) => {
  const message = "added";
  const cartData = getState().cart;
  let processCartData = _.cloneDeep(cartData);
  let removedProduct = processCartData.cartProducts.filter(
    (item) => item.ID === id
  );
  if (removedProduct) {
    processCartData.cartSubTotal =
      processCartData.cartSubTotal -
      removedProduct[0].TotalProductPrice * Number(removedProduct[0].Quantity);
    processCartData.discount =
      Number(processCartData.discount || 0) -
      Number(
        removedProduct[0].discountGiven * Number(removedProduct[0].Quantity) ||
          0
      );
  }
  processCartData.cartProducts = processCartData.cartProducts.filter(
    (item) => item.ID !== id
  );
  dispatch(cartActions.setCart(processCartData));

  window.localStorage.setItem("cartData", JSON.stringify(processCartData));
  return message;
});

export const addQuantity = createAsyncThunk<
  string,
  { id: number },
  AsyncThunkConfig
>(CartThunks.addQuantity, async ({ id }, { dispatch, getState }) => {
  const message = "";
  const cartData = getState().cart;
  let processCartData = _.cloneDeep(cartData);

  const index = processCartData.cartProducts.findIndex(
    (item) => item.ID === id
  );
  if (index !== -1) {
    processCartData.cartProducts[index].Quantity += 1;
    processCartData.cartSubTotal +=
      processCartData.cartProducts[index].TotalProductPrice;
    processCartData.discount =
      Number(processCartData.discount || 0) +
      Number(processCartData.cartProducts[index].discountGiven || 0);

    dispatch(cartActions.setCart(processCartData));
    window.localStorage.setItem("cartData", JSON.stringify(processCartData));
  } else {
    console.log(`Item with ID ${id} not found in cart`);
  }

  return message;
});
export const removeQuantity = createAsyncThunk<
  string,
  { id: number },
  AsyncThunkConfig
>(CartThunks.removeQuantity, async ({ id }, { dispatch, getState }) => {
  const message = "";
  const cartData = getState().cart;
  let processCartData = _.cloneDeep(cartData);

  const index = processCartData.cartProducts.findIndex(
    (item) => item.ID === id
  );
  gtag("event", "remove_from_cart", {
    items: [
      {
        id: processCartData.cartProducts[index].ItemID,
        name: processCartData.cartProducts[index].ProductName,
        quantity: processCartData.cartProducts[index].Quantity,
        price: processCartData.cartProducts[index].TotalProductPrice,
      },
    ],
  });
  if (index !== -1) {
    processCartData.cartProducts[index].Quantity -= 1;
    processCartData.cartSubTotal -=
      processCartData.cartProducts[index].TotalProductPrice;
    processCartData.discount =
      Number(processCartData.discount || 0) -
      Number(processCartData.cartProducts[index].discountGiven || 0);

    if (processCartData.cartProducts[index].Quantity <= 0) {
      // Remove the item if the quantity is zero or negative
      processCartData.cartProducts = processCartData.cartProducts.filter(
        (item) => item.ID !== id
      );
    }
    if (processCartData.cartProducts.length <= 0) {
      processCartData.Voucher = "";
      processCartData.discount = 0;
      processCartData.cartSubTotal = 0;
      processCartData.cartTotal = 0;
    }
    dispatch(cartActions.setCart(processCartData));
    window.localStorage.setItem("cartData", JSON.stringify(processCartData));
  } else {
    console.log(`Item with ID ${id} not found in cart`);
  }

  return message;
});
declare const gtag: (
  arg0: string,
  arg1: string,
  arg2: { items: { id: any; name: any; quantity: any; price: any }[] }
) => void;

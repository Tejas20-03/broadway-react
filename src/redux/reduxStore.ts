import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import { cartSlice } from "./cart/slice";
import addressesSlice from "./address/slice";
const reduxStore = configureStore({
  reducer: combineReducers({
    cart: cartSlice.reducer,
    address: addressesSlice.reducer,
  }),
});
export default reduxStore;
export type StoreDispatch = typeof reduxStore.dispatch;
export type StoreState = ReturnType<typeof reduxStore.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  StoreState,
  unknown,
  Action
>;
export type AsyncThunkConfig = {
  state: StoreState;
  dispatch: StoreDispatch;
  extra?: unknown;
  rejectValue?: unknown;
  serializedErrorType?: unknown;
  pendingMeta?: unknown;
  fulfilledMeta?: unknown;
  rejectedMeta?: unknown;
};

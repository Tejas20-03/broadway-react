import { OptionsType, ProductType } from "@/redux/cart/slice";

export type PostOrderData = {
  platform: string;
  Outlet: string;
  phone: string;
  Remarks: string;
  fullname: string;
  cityname: string;
  tax: number;
  deliverytime: string;
  ordertype: string;
  orderamount: number;
  taxamount: number;
  discountamount: string;
  totalamount: number;
  deliverycharges: number;
  Voucher: string;
  orderdata: ProductType[];
  paymenttype: string;
  Area: string;
  customeraddress: string;
  Email: string;
};

export type ResponseOrder = {
  DeliveryTime: string;
  OrderAmount: string;
  OrderID: string;
  URL: string;
  message: string;
  responseType: 1 | 0;
  name?: string;
};

export type VoucherResponse = {
  responseType: "1" | "0";
  Message: string;
  VoucherAmount: number;
};

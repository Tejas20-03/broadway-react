import { CircularProgress } from "@mui/material";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";

const PlaceOrder = dynamic(() => import("@/components/Cart/PlaceYourOrder/PlaceOrder"), {
  loading: () => <CircularProgress/>
});

function page() {
  return (
    <>
      <Head>
        <title>Almost There! - Place your order now</title>
        <meta
          name="description"
          content="Broadway Pizza is offering online ordering services in Pakistan. Order now and get amazing discounts and coupons on pizza deals and other fast food."
        ></meta>
      </Head>
      <PlaceOrder />
    </>
  );
}

export default page;

import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { CircularProgress } from "@mui/material";

const Location = dynamic(() => import("@/components/Locations/Location"), {
  loading: () => <CircularProgress />,
});

export default function page() {
  return (
    <>
      <Head>
        <title>Locations - Broadway Pizza Pakistan</title>
        <meta
          name="description"
          content="Broadway Pizza is offering online ordering services in Pakistan. Order now and get amazing discounts and coupons on pizza deals and other fast food."
        ></meta>
      </Head>
      <Location />
    </>
  );
}

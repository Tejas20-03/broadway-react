import GetAppFooter from "@/components/Common/GetAppFooter";
import ThankYou from "@/components/ThankYou/ThankYou";
import Head from "next/head";
import React from "react";

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
      <ThankYou />
      <GetAppFooter />
    </>
  );
}

export default page;

import { CircularProgress } from "@mui/material";
import dynamic from "next/dynamic";
import Head from "next/head";

const MainHome = dynamic(() => import("@/components/Ahome/MainHome"), {
  loading: () => <CircularProgress/>
});

export default function page() {
  return (
    <>
      <Head>
        <title>Broadway Pizza Pakistan - Best Pizza Deals!</title>
        <meta
          name="description"
          content="Broadway Pizza is offering online ordering services in Pakistan. Order now and get amazing discounts and coupons on pizza deals and other fast food."
        ></meta>
      </Head>
      <MainHome />
    </>
  );
}

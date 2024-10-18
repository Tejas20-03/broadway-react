import Head from "next/head";
import dynamic from "next/dynamic";
import { CircularProgress } from "@mui/material";


const Corporate = dynamic(() => import("@/components/Corporate/Corporate"), {
  loading: () => <CircularProgress/>
});

export default function page() {
  return (
    <>
      <Head>
        <title>Corporate Event - Broadway Pizza Pakistan</title>
        <meta
          name="description"
          content="Broadway Pizza is offering online ordering services in Pakistan. Order now and get amazing discounts and coupons on pizza deals and other fast food."
        ></meta>
      </Head>
      <Corporate />
    </>
  );
}

import dynamic from "next/dynamic";
import Head from "next/head";
import { CircularProgress } from "@mui/material";


const Catering = dynamic(() => import("@/components/Catering/Catering"), {
  loading: () => <CircularProgress/>,
});

export default function page() {
  return (
    <>
      <Head>
        <title>Catering Event - Broadway Pizza Pakistan</title>
        <meta
          name="description"
          content="Broadway Pizza is offering online ordering services in Pakistan. Order now and get amazing discounts and coupons on pizza deals and other fast food."
        ></meta>
      </Head>
      <Catering />
    </>
  );
}

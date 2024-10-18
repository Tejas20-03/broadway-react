import Head from "next/head";
import dynamic from "next/dynamic";
import { CircularProgress } from "@mui/material";

const Menu = dynamic(() => import("@/components/Menu/Menu"), {
  loading: () => <CircularProgress />,
});

export default function page() {
  return (
    <>
      <Head>
        <title>Menu - Fast Pizza Delivery - Broadway Pizza Pakistan</title>
        <meta
          name="description"
          content="Broadway Pizza is offering online ordering services in Pakistan. Order now and get amazing discounts and coupons on pizza deals and other fast food."
        ></meta>
      </Head>
      <Menu />
    </>
  );
}

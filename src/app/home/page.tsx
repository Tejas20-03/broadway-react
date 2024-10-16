import MainHome from "@/components/Ahome/MainHome";
import Head from "next/head";

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

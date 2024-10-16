import Contact from "@/components/Contact/Contact";
import Head from "next/head";

export default function page() {
  return (
    <>
      <Head>
        <title>Contact - Broadway Pizza Pakistan</title>
        <meta
          name="description"
          content="Broadway Pizza is offering online ordering services in Pakistan. Order now and get amazing discounts and coupons on pizza deals and other fast food."
        ></meta>
      </Head>
      <Contact />
    </>
  );
}

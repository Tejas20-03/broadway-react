import Head from "next/head";
import Menu from "../../components/Menu/Menu";

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

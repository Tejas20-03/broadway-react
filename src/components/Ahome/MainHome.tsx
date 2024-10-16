import GetAppFooter from "../Common/GetAppFooter";
import Blogs from "../Home/Blogs";
import HeroCarousel from "../Home/HeroCarousel";
import AboutBroadway from "./AboutBroadway";
import OurLocation from "./OurLocation";

export default function MainHome() {
  return (
    <>
      <HeroCarousel />
      <AboutBroadway />
      <OurLocation />

      <GetAppFooter />
    </>
  );
}

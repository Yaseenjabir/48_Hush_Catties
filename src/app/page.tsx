import Aboutus from "../../MyComponents/Main/Homepage/Aboutus";
import BrandBanner from "../../MyComponents/Main/Homepage/BrandBanner";
import FourSections from "../../MyComponents/Main/Homepage/FourDifferentSections";
import HeroSection from "../../MyComponents/Main/Homepage/HeroSection";
import HomeSectionBlog from "../../MyComponents/Main/Homepage/HomeSectionBlog";
import NewArrivals from "../../MyComponents/Main/Homepage/NewArrivals/NewArrivals";
import OurBestSelling from "../../MyComponents/Main/Homepage/OurBestSelling";
import OurCollections from "../../MyComponents/Main/Homepage/OurCollections";
import Reviews from "../../MyComponents/Main/Homepage/Review/Reviews";

export default function Home() {
  return (
    <section>
      <HeroSection />
      <OurCollections />
      <OurBestSelling />
      <BrandBanner />
      <NewArrivals />
      <Aboutus />
      <FourSections />
      <Reviews />
      <HomeSectionBlog />
    </section>
  );
}

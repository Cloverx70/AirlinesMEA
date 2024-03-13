import React from "react";
import { Helmet } from "react-helmet";
import NavBar from "../Components/NavBar";
import HeroSection from "../Components/HeroSection";
import MeaInfo from "../Components/MeaInfo";
import FlightsPreview from "../Components/FlightsPreview";
import WebsiteReviews from "../Components/WebsiteReviews";

const HomePage = () => {
  return (
    <section className="relative">
      <Helmet>
        <title>MEA</title>
      </Helmet>

      <HeroSection />
      <MeaInfo />
      <FlightsPreview />
      <WebsiteReviews />
    </section>
  );
};

export default HomePage;

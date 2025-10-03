import { Link } from "react-router-dom";

import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { Done } from "../components/icons/Done";
import image from "../../src/assets/buyer-image.jpg";
import ReviewsSection from "../components/layout/ReviewsSection";

export default function Homepage() {
  return (
    <div className="w-full">
      <Header />

      <div className="flex flex-col md:flex-row max-w-7xl mx-auto my-8">
        <div className="bg-secondary w-[90%] mx-auto md:w-1/2 p-8 md:rounded-tl-lg md:rounded-bl-lg flex flex-col items-start justify-between">
          <div>
            <h1 className="text-bg text-2xl md:text-4xl font-bold mb-4">
              Horea.co Buyer Protection
            </h1>
            <ul className="[&>li]:flex [&>li]:gap-1 text-lg md:text-2xl text-bg/70 space-y-2">
              <li>
                <Done /> Payment via the Escrow Service
              </li>
              <li>
                <Done /> Commitment to Authenticity
              </li>
              <li>
                <Done /> Strict dealer guidelines
              </li>
              <li>
                <Done /> Insured shipments
              </li>
              <li>
                <Done /> Chrono24's quality & security team
              </li>
            </ul>
          </div>
          <button className="text-bg text-lg md:text-xl rounded-sm text-left p-2 px-6 mt-8 border border-bg">
            <Link to="/">Learn more about security on Horeo.co</Link>
          </button>
        </div>

        <div className="w-[90%] md:w-1/2 mx-auto">
          <img
            src={image}
            alt="image"
            className="w-full h-full object-cover md:rounded-tr-lg md:rounded-br-lg"
          />
        </div>
      </div>

      <ReviewsSection />

      <Footer />
    </div>
  );
}

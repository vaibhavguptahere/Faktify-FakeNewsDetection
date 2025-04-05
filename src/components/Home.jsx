import FeaturesSection from "./FeaturesSection";
import Hero from "./Hero";
import Pricing from "./Pricing";
import SubscriptionSection from "./SubscriptionSection";
import { useEffect } from "react";

function Home() {

    useEffect(() => {
      document.title = "Home | Faktify";
    }, []);

  return (
    <div>
      <Hero/>
       <FeaturesSection/>
      {/* <Pricing />
      <SubscriptionSection/>  */}
    </div>
  );
}
export default Home;

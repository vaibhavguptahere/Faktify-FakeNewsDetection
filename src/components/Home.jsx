import FeaturesSection from "./FeaturesSection";
import Hero from "./Hero";
import { useEffect } from "react";

function Home() {

    useEffect(() => {
      document.title = "Home | Faktify";
    }, []);

  return (
    <div>
      <Hero/>
       <FeaturesSection/>

    </div>
  );
}
export default Home;

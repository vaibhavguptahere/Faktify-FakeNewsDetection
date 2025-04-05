import FeaturesSection from "./FeaturesSection";
import Hero from "./Hero";
import { useEffect,useRef } from "react";

function Home() {

    useEffect(() => {
      document.title = "Home | Faktify";
    }, []);
    const featuresRef = useRef(null);
    const handleScrollToFeatures = () => {
      featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

  return (
    <div>
      <Hero/>
       <FeaturesSection ref={featuresRef}/>
    </div>
  );
}
export default Home;

import React from "react";
import './App.css'
import FirstSection from "./components/FirstSection";
import LogoComp from "./components/LogoComp";
import ContentSection from "./components/ContentSection";
import AlternateContent from "./components/AlternateContent";
import FifthSection from "./components/FifthSection";
import SlideShow from "./components/SlideShow";
function App() {
  return (
    <div className="ml-36 mr-36">
      <FirstSection/>
      <LogoComp/>
      <ContentSection/>
      <AlternateContent/>
      <FifthSection/>
      <SlideShow/>
    </div>
  );
}

export default App;
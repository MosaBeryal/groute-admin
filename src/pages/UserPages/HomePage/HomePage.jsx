import React, { useEffect } from "react";
import DropDownSelection from "../DropDownSelection/DropDownSelection";
import ContactUs from "../ContactUs/ContactUs";
import HelpResources from "../HelpResources/HelpResources";
import NpcSectors from "../NpcSectors/NpcSectors";
import WhyChooseNpc from "../WhyChooseNpc/WhyChooseNpc";
import Sliders from "../Sliders/Sliders";

const HomePage = () => {

  return (
    <div>
      {/* DropDown */}
      <DropDownSelection />

      {/* Slider */}
      <Sliders />

      {/* why choose Npc */}
      <WhyChooseNpc />

      {/* Npc Sector */}
      <NpcSectors />

      {/* Help Resources */}
      <HelpResources />

      {/* Contact Us */}
      <ContactUs />
    </div>
  );
};

export default HomePage;

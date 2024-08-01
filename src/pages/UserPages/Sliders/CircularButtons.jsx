import React from 'react';
import { useTranslation } from 'react-i18next';
import gdsn from "../../../Images/circular/gdsn.png";
import data from "../../../Images/circular/data.png";
import gs1 from "../../../Images/circular/gs1.png";
import governance from "../../../Images/circular/governance.png";
import receipts from "../../../Images/circular/receipts.png";
import compliance from "../../../Images/circular/compliance.png";
import certification from "../../../Images/circular/certification.png";
import apicommunity from "../../../Images/circular/apicommunity.png";
import dataquality from "../../../Images/circular/dataquality.png";
import customer from "../../../Images/circular/customer.png";

const CircularButtons = () => {
  const { t, i18n } = useTranslation();
  const buttons = [
    { name: 'GDSN', icon: gdsn, link: '/gdsn' },
    { name: 'Data Validator', icon: data, link: '/data-validator' },
    { name: 'GS1', icon: gs1, link: '/gs1' },
    { name: 'Governance', icon: governance, link: '/governance' },
    { name: 'Recipients', icon: receipts, link: '/recipients' },
    { name: 'Compliance', icon: compliance, link: '/compliance' },
    { name: 'NPC Certification', icon: certification, link: '/npc-certification' },
    { name: 'API Community', icon: apicommunity, link: '/api-community' },
    { name: 'Data Quality Management', icon: dataquality, link: '/data-quality-management' },
    { name: 'Customer Support', icon: customer, link: '/customer-support' },
  ];

  return (
    <div className="relative w-[406px] h-[406px] rounded-full flex justify-center items-center bg-white">
      <div className="absolute w-40 h-40 bg-[#0038FF] rounded-full flex justify-center items-center">
        <span className="text-white text-center font-sans font-semibold">National Data Hub (NPC)</span>
      </div>
      {buttons.map((button, index) => (
        <div
          key={index}
          className="absolute flex flex-col items-center"
          style={{
            transform: `rotate(${index * 36}deg) translate(150px) rotate(-${index * 36}deg)`
          }}
        >
          <a
            href={button.link}
            className="w-16 h-16 bg-white hover:shadow-secondary rounded-full shadow-xl flex justify-center items-center"
          >
            <img src={button.icon} alt={button.name} className="w-8 h-8" />
          </a>
          <span className="text-center text-[9px] text-secondary font-semibold w-16 mt-1">{button.name}</span>
        </div>
      ))}
    </div>
  );
};

export default CircularButtons;

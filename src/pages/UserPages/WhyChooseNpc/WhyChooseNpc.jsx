import React from 'react';
import improved from "../../../Images/whychoosenpc/improved.png";
import enhanced from "../../../Images/whychoosenpc/enhanced.png";
import enhanceddata from "../../../Images/whychoosenpc/enhanceddata.png";
import expense from "../../../Images/whychoosenpc/expense.png";
import faster from "../../../Images/whychoosenpc/faster.png";
import market from "../../../Images/whychoosenpc/market.png";
import optimized from "../../../Images/whychoosenpc/optimized.png";
import process from "../../../Images/whychoosenpc/process.png";
import product from "../../../Images/whychoosenpc/product.png";
import regulatory from "../../../Images/whychoosenpc/regulatory.png";
import sustainability from "../../../Images/whychoosenpc/sustainability.png";

const WhyChooseNpc = () => {
  const features = [
    { img: improved, title: 'Improved Data Exchange', description: 'Enable efficient data sharing among all supply chain partners.' },
    { img: product, title: 'Product Information', description: 'Digitization Automate the exchange of product and item data for enhanced operational efficiency.' },
    { img: faster, title: 'Faster Market Penetration', description: 'Gain a competitive edge by delivering your product to customers more quickly.' },
    { img: expense, title: 'Expense Reduction', description: 'Decrease costs and administrative efforts.' },
    { img: enhanced, title: 'Enhanced Data Precision', description: 'Boost data accuracy and reduce errors and duplications.' },
    { img: optimized, title: 'Optimized Inventory Management', description: 'Maintain ideal stock levels across your supply chain.' },
    { img: regulatory, title: 'Regulatory Adherence', description: 'Easily comply with industry standards and regulations.' },
    { img: process, title: 'Process Efficiency', description: 'Simplify and standardize supply chain processes.' },
    { img: enhanceddata, title: 'Enhanced Collaboration', description: 'Strengthen cooperation and coordination with trading partners.' },
    { img: market, title: 'Market Responsiveness', description: 'Quickly adapt to market changes and customer demands.' },
    { img: sustainability, title: 'Sustainability', description: 'Promote eco-friendly practices by reducing paper use through digitization.' },
  ];

  return (
    <div>
      <div className='h-auto w-full font-sans bg-[#DDF3F6] px-10 py-10'>
        <h2 className='font-medium font-sans text-lg'>We are dedicated to enhancing the accuracy and quality of product and item data for everyone within your supply chain.</h2>
        <p className='font-sans'>By utilizing our comprehensive system, you can ensure that all data is precise and up-to-date, minimizing errors and discrepancies that can disrupt operations.</p>

        <h2 className='font-medium font-sans text-lg mt-6'>The National Product Catalogue empowers you to maintain and share product and item information seamlessly with all trading partners in real-time. </h2>
        <p className='font-sans'>This real-time data sharing ensures that everyone in the supply chain has access to the latest information, fostering better communication and collaboration. With our system, you can streamline processes, improve efficiency, and enhance overall supply chain performance.</p>

        <h2 className='font-medium font-sans text-lg mt-6'>In addition, the National Product Catalogue supports regulatory compliance, helping you meet industry standards with ease. </h2>
        <p className='font-sans'>It also aids in optimizing inventory management, ensuring that stock levels are maintained accurately and efficiently. By adopting our solution, you can reduce costs, expedite market entry, and stay ahead of the competition, all while fostering a more sustainable and eco-friendly business environment.</p>
      </div>
    <div className="container sm:px-12 px-6 py-8">
      <h2 className="sm:text-2xl text-lg font-medium font-sans text-secondary mb-6">Why Choose the NPC National Product Catalogue?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start space-x-4">
            <img src={feature.img} alt={feature.title} className="w-10 h-10" />
            <div>
              <h3 className="font-semibold font-sans">{feature.title}</h3>
              <p className='font-sans'>{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default WhyChooseNpc;

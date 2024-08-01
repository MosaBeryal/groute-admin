import React from 'react';
import globe from "../../../../Images/globe.png";

const LocalProductRegistry = () => {
  return (
    <div className="p-4">
      <div className="bg-white shadow-md rounded-md overflow-hidden flex flex-col md:flex-row relative">
        {/* Sidebar */}
        <div className="md:absolute space-y-4 left-0 md:top-1/2 md:transform md:-translate-y-1/2 bg-[#1F0567] text-white p-4 flex flex-col items-center justify-center md:w-40 md:h-64 w-full h-auto md:rounded-none rounded-b-lg" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 0% 75%, 0% 25%)', marginBottom: '20px' }}>
          <img src={globe} alt='globe' className='w-24 h-26 object-contain -mt-6'/>
          <div className="text-center font-bold text-sm">GS1 with NPC</div>
        </div>

        {/* Main Content */}
        <div className="flex-grow bg-dashboard-color p-4 ml-0 md:ml-16 md:pl-20">
          {/* Data In Section */}
          <div className="mb-4 ml-0 md:ml-8">
            <div className="text-lg mb-2">Data In</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#68B05C] shadow-lg font-bold text-white p-4 rounded-md text-center">Licence Registry</div>
              <div className="bg-[#68B05C] shadow-lg font-bold text-white p-4 rounded-md text-center">GTIN Registry</div>
              <div className="bg-[#68B05C] shadow-lg font-bold text-white p-4 rounded-md text-center">GLN Registry</div>
              <div className="bg-[#68B05C] shadow-lg font-bold text-white p-4 rounded-md text-center">Links Registry</div>
              <div className="bg-[#68B05C] shadow-lg font-bold text-white p-4 rounded-md text-center">Asset Registry</div>
            </div>
          </div>

          {/* Data Out Section */}
          <div className="mb-4 ml-0 md:ml-8">
            <div className="text-lg mb-2">Data Out</div>
            <div className="bg-[#68B05C] text-white p-4 rounded-md text-center mb-2">
              <p className='font-bold'> Verified by GS1</p>
              <p>via API . VBG on gs.org . ( Global Verified Component, FY23/24 )</p>
            </div>
            <div className="text-center text-sm mb-4">
              
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#68B05C] text-white p-4 rounded-md text-center">
                GTIN<br />Get Verified GTIN's API
              </div>
              <div className="bg-[#68B05C] text-white p-4 rounded-md text-center">
                GLN<br />Get Verified GLN by key API
              </div>
              <div className="bg-[#68B05C] text-white p-4 rounded-md text-center">
                Other Keys<br />Get Verified Licensee by key
              </div>
              <div className="bg-[#68B05C] text-white p-4 rounded-md text-center">
                Company Name<br />Get Verified by Name API
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalProductRegistry;

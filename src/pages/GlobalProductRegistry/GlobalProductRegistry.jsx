import React from "react";
import { FaCloudUploadAlt, FaCloudDownloadAlt } from 'react-icons/fa';

const GlobalProductRegistry = () => {
  return (
    <div className="p-4">
      {/* Data Upload Header */}
      <div className="text-center mb-4 w-full flex justify-between items-center gap-6">
          <div className="bg-white hover:bg-gray-200 hover:cursor-pointer w-full shadow-lg rounded-md overflow-hidden p-4 flex items-center justify-center">
            <FaCloudUploadAlt className="mr-2 text-blue-500" size={30} />
            <div className="text-2xl font-bold text-secondary">Data Upload</div>
          </div>

          {/* Data Usage Header */}
          <div className="bg-white hover:bg-gray-200 hover:cursor-pointer w-full shadow-lg rounded-md overflow-hidden p-4 flex items-center justify-center">
            <FaCloudDownloadAlt className="mr-2 text-blue-500" size={30} />
            <div className="text-2xl font-bold text-secondary">Data Usage</div>
          </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* GTINs Loaded */}
        <div className="bg-white shadow-md rounded-md overflow-hidden">
          <div className="bg-green-600 text-white text-xl text-center font-bold py-2">
            GTINs Loaded
          </div>
          <div className="flex">
            <div className="flex-1 p-11 flex items-center justify-center">
              <div className="text-3xl font-bold text-secondary">390 M</div>
            </div>
            <div className="flex flex-col justify-center items-center bg-[#61E78E] p-4">
              <p className="text-xl font-bold text-secondary">+</p>
              <p className="text-xl font-bold text-secondary"> 97%</p>
              <p className="text-sm text-secondary">vs. year ago (YA)</p>
            </div>
          </div>
        </div>

        {/* COA Company GTINs */}
        <div className="bg-white shadow-md rounded-md overflow-hidden">
          <div className="bg-[#E7AB12] text-white text-xl text-center font-bold py-2">
            COA Company GTINs
          </div>
          <div className="flex">
            <div className="flex-1 p-11 flex items-center justify-center">
              <div className="text-3xl font-bold text-secondary">341 k</div>
            </div>
            <div className="flex flex-col justify-center items-center bg-[#DCE761] p-4">
              <p className="text-xl font-bold text-secondary">+</p>
              <p className="text-xl font-bold text-secondary"> 27%</p>
              <p className="text-sm text-secondary">vs. year ago (YA)</p>
            </div>
          </div>
        </div>

        {/* GTINs Queried / month */}
        <div className="bg-white shadow-md rounded-md overflow-hidden">
          <div className="bg-[#8F8263] text-white text-xl text-center font-bold py-2">
            GTINs Queried / month
          </div>
          <div className="flex">
            <div className="flex-1 p-11 flex items-center justify-center">
              <div className="text-3xl font-bold text-secondary">87 M</div>
            </div>
            <div className="flex flex-col justify-center items-center bg-[#C7B485] p-4">
              <p className="text-xl font-bold text-secondary">+</p>
              <p className="text-xl font-bold text-secondary"> 170%</p>
              <p className="text-sm text-secondary">vs. year ago (YA)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {/* Countries */}
        <div className="bg-white shadow-md rounded-md overflow-hidden">
          <div className="bg-[#1D5284] text-white text-xl text-center font-bold py-2">
            Countries
          </div>
          <div className="flex">
            <div className="flex-1 p-11 flex items-center justify-center">
              <div className="text-3xl font-bold text-secondary">93</div>
            </div>
            <div className="flex flex-col justify-center items-center bg-[#5A9BD8] p-4">
              <p className="text-xl font-bold text-secondary">+</p>
              <p className="text-xl font-bold text-secondary"> 33%</p>
              <p className="text-sm text-secondary">vs. year ago (YA)</p>
            </div>
          </div>
        </div>

        {/* % of World GDP */}
        <div className="bg-white shadow-md rounded-md overflow-hidden">
          <div className="bg-[#2A6CA9] text-white text-xl text-center font-bold py-2">
            % of World GDP
          </div>
          <div className="flex">
            <div className="flex-1 p-11 flex items-center justify-center">
              <div className="text-3xl font-bold text-secondary">97%</div>
            </div>
            <div className="flex flex-col justify-center items-center bg-[#74B8F6] p-4">
              <p className="text-xl font-bold text-secondary">+</p>
              <p className="text-xl font-bold text-secondary"> 5 pts</p>
              <p className="text-sm text-secondary">vs. year ago (YA)</p>
            </div>
          </div>
        </div>

        {/* Countries (Usage) */}
        <div className="bg-white shadow-md rounded-md overflow-hidden">
          <div className="bg-[#D25C4C] text-white text-xl text-center font-bold py-2">
            Countries
          </div>
          <div className="flex">
            <div className="flex-1 p-11 flex items-center justify-center">
              <div className="text-3xl font-bold text-secondary">65</div>
            </div>
            <div className="flex flex-col justify-center items-center bg-[#EFBDB6] p-4">
              <p className="text-xl font-bold text-secondary">+</p>
              <p className="text-xl font-bold text-secondary"> 63%</p>
              <p className="text-sm text-secondary">vs. year ago (YA)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalProductRegistry;

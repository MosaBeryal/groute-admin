import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FilePlus2, ChevronDown, ChevronUp } from 'lucide-react';
import { Loader } from "lucide-react"; // Import Lucide Spinner
import newRequest from "../UserRequest"; // Adjust the import based on your project structure

const Sidebar = () => {
  const [templateData, setTemplateData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);

  const fetchTemplateData = async () => {
    try {
      const response = await newRequest.get("/blogs/template");
      const data = response.data;
      setTemplateData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplateData();
  }, []);

  const templatePathMap = {
    0: "/template1",
    1: "/template2",
    2: "/template3",
    3: "/template4",
    4: "/template5",
    5: "/template6",
    6: "/template7",
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <aside className="w-64 bg-blue-50 text-blue-900 p-4 hidden lg:block">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        Templates
        <button
          onClick={handleDropdownToggle}
          className="ml-auto text-white focus:outline-none"
        >
          {isDropdownOpen ? <ChevronUp size={20} className="text-blue-900" /> : <ChevronDown size={20} className="text-blue-900"/>}
        </button>
      </h2>
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader className="animate-spin text-blue-900" size={24} />
          <span className="ml-2"></span>
        </div>
      ) : (
        <ul
          className={`text-sm flex flex-col gap-3 transition-transform duration-300 ${
            isDropdownOpen ? "max-h-screen" : "max-h-0 overflow-hidden"
          }`}
        >
          {templateData.map((item, index) => {
            const path =
              templatePathMap[index] || `/admin/template${index + 1}`;
            return (
              <li key={index}>
                <Link
                  to={path}
                  className="flex items-center p-2 gap-5 text-blue-900 rounded hover:bg-blue-900  hover:text-white transition duration-300"
                  onClick={() => {
                    sessionStorage.setItem(
                      "selectedTemplate",
                      JSON.stringify(item)
                    );
                  }}
                >
                  <FilePlus2 size={20}  />
                  <span className="font-semibold text-base capitalize">
                    {item.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </aside>
  );
};

export default Sidebar;

import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Navbar */}
      <header className="bg-blue-50 text-white p-4 shadow-md">
        <nav className="container flex items-center justify-between">
          <h1 className="text-xl font-bold text-blue-900">G-Route Admin</h1>
          <button onClick={toggleSidebar} className="text-white lg:hidden">
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex lg:w-64 lg:flex-shrink-0">
          <Sidebar />
        </aside>

        {/* Mobile Sidebar */}
        <div
          className={`fixed inset-0 bg-blue-900 text-white p-4 lg:hidden transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button onClick={toggleSidebar} className="text-white mb-4">
            <X size={24} />
          </button>
          <Sidebar />
        </div>

        {/* Main Content */}
        <main
          className={`flex-1 overflow-x-auto p-4 ${
            isSidebarOpen ? "lg:ml-64" : "lg:ml-0"
          } transition-all duration-300`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

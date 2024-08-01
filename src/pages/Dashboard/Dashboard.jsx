import React, { useEffect, useState } from 'react'
import FirstProductsBarChart from './FirstProductsBarChart';
import TopBrandsBarChart from './TopBrandsBarChart';

const Dashboard = () => {
  const [chartData, setChartData] = useState([]);
  const [topBrandsChartData, setTopBrandsChartData] = useState([]);

  useEffect(() => {
    // Define dummy data
    const dummyData = [
      { month: 'January', GTIN: 120, GLN: 85, BrandName: 100 },
      { month: 'February', GTIN: 150, GLN: 90, BrandName: 120 },
      { month: 'March', GTIN: 170, GLN: 110, BrandName: 140 },
      { month: 'April', GTIN: 200, GLN: 130, BrandName: 160 },
      { month: 'May', GTIN: 230, GLN: 150, BrandName: 180 },
      { month: 'June', GTIN: 250, GLN: 170, BrandName: 200 },
    ];

    // Define dummy data for TopBrandsBarChart
    const topBrandsData = [
      { name: 'Brand A', count: 1500 },
      { name: 'Brand B', count: 1200 },
      { name: 'Brand C', count: 1000 },
      { name: 'Brand D', count: 800 },
      { name: 'Brand E', count: 600 },
      { name: 'Brand F', count: 1000 },
      { name: 'Brand G', count: 500 },

    ];

    setChartData(dummyData);
    setTopBrandsChartData(topBrandsData);

    // auto scroll to bottom
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);


  return (
    <div className='bg-dashboard-color'>
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Total Products</h2>
      <div className='flex justify-center items-center mb-6'>
        <div className="h-auto w-[97%] px-0 pt-4">
          <div className="h-auto w-full p-0 py-5 bg-white shadow-xl rounded-md">
            <FirstProductsBarChart data={chartData} />
          </div>
        </div>
      </div>   

      {/* Top Brands */}
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Top Brands</h2>
      <div className='flex justify-center items-center mb-6'>
        <div className="h-auto w-[97%] px-0 pt-4">
          <div className="h-auto w-full p-0 py-5 bg-white shadow-xl rounded-md">
            <TopBrandsBarChart data={topBrandsChartData} />
          </div>
        </div>
      </div>   
    </div>
  )
}

export default Dashboard
import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import CircularProgress from '@mui/material/CircularProgress';

const FirstProductsBarChart = ({ data }) => {
  const [loading, setLoading] = React.useState(true);

  // Ensure data is defined and an array
  const chartData = Array.isArray(data) ? data : [];

  React.useEffect(() => {
    if (chartData.length) {
      setLoading(false);
    }
  }, [chartData]);

  // Show loader while data is being loaded
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '350px' }}>
        <CircularProgress />
      </div>
    );
  }

  const months = chartData.map(item => item.month);
  const gtinData = chartData.map(item => item.GTIN);
  const glnData = chartData.map(item => item.GLN);
  const BrandNameData = chartData.map(item => item.BrandName);

  // console.log('Months:', months);
  // console.log('GTIN Series Data:', gtinData);
  // console.log('GLN Series Data:', glnData);
  // console.log('SSCC Series Data:', ssccData);

  const chartSetting = {
    yAxis: [{ label: 'Count' }],
  };

  return (
    <div style={{ width: '100%', marginLeft: '20px'}}>
    <BarChart
      height={350}
      // width={800}
      xAxis={[{ scaleType: 'band', data: months }]}
      series={[
        { data: gtinData, label: 'GTIN', barWidth: 20 },
        { data: glnData, label: 'GLN', barWidth: 20 },
        { data: BrandNameData, label: 'BrandName', barWidth: 20 },
      ]}
      barLabel="value"
      {...chartSetting}
      />
      </div>
  );
};

export default FirstProductsBarChart;

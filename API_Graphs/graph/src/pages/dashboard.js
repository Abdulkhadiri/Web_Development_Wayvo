import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import dash from '@/styles/dashboard.module.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/api/data');
  const data = await res.json();

  const filteredData = data.map(item => ({
    dt: item.dt,
    auction_lots_count: item.auction_lots_count,
    all_auctions_lots_count: item.all_auctions_lots_count,
    auction_name: item.auction_name,
  }));

  return {
    props: {
      data: filteredData,
    },
  };
}

export default function Dashboard({ data }) {
  const [view, setView] = useState('year');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [appliedYear, setAppliedYear] = useState('');
  const [appliedMonth, setAppliedMonth] = useState('');

  const groupedData = data.reduce((acc, item) => {
    const year = new Date(item.dt).getFullYear();
    const month = new Date(item.dt).getMonth() + 1;
    if (!acc[year]) {
      acc[year] = {};
    }

    if (!acc[year][month]) {
      acc[year][month] = [];
    }

    acc[year][month].push(item);

    return acc;
  }, {});

  const auctionNames = [...new Set(data.map(item => item.auction_name))];

  const yearLabels = Object.keys(groupedData);
  const yearData = yearLabels.map(year => {
    return Object.values(groupedData[year]).flat().reduce((sum, item) => sum + item.auction_lots_count, 0);
  });

  const monthLabels = Array.from({ length: 12 }, (_, i) => i + 1);
  const monthData = monthLabels.map(month => {
    return data.filter(item => new Date(item.dt).getMonth() + 1 === month)
               .reduce((sum, item) => sum + item.auction_lots_count, 0);
  });

  const yearChartData = {
    labels: yearLabels,
    datasets: [
      {
        label: 'Auction Lots Count by Year',
        data: yearData,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const monthChartData = {
    labels: monthLabels,
    datasets: [
      {
        label: 'Auction Lots Count by Month',
        data: monthData,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  const filteredMonthData = appliedYear ? groupedData[appliedYear][appliedMonth] || [] : [];
  const filteredMonthChartData = {
    labels: filteredMonthData.map(item => item.auction_name),
    datasets: [
      {
        label: `Auction Lots Count for ${appliedYear}-${appliedMonth}`,
        data: filteredMonthData.map(item => item.auction_lots_count),
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
      },
    ],
  };

  const handleApply = () => {
    setAppliedYear(selectedYear);
    setAppliedMonth(selectedMonth);
    setView('filter')
  };

  return (
    <>
      <center><h1 className={dash.h} >Dashboard</h1></center>
      <div className={dash.options}>
        <button onClick={() => setView('year')}>Year</button>
        <button onClick={() => setView('month')}>Month</button>
        <div className="">
            <label className={dash.h} >
              Select Year:
              <select value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
                <option value="">Select Year</option>
                {yearLabels.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </label>
            <label className={dash.h} >
              Select Month:
              <select value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)}>
                <option value="">Select Month</option>
                {monthLabels.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </label>
            <button onClick={handleApply}>Apply</button>
          </div>
      </div>
      {view=='filter'&&appliedYear && appliedMonth && (
            <>
             <center><h2 className={dash.h} >Auction Lots Count for {appliedYear}-{appliedMonth}</h2></center>
              <div className={dash.chart}>
                <Bar data={filteredMonthChartData} />
              </div>
            </>
          )}
      {view === 'year' && (
        <>
         <center><h2 className={dash.h} >Auction Lots Count by Year</h2></center> 
          <div className={dash.chart}>
            <Bar data={yearChartData} />
          </div>
        </>
      )}
      {view === 'month' && (
        <>
         <center> <h2 className={dash.h} >Auction Lots Count by Month</h2></center>
          <div className={dash.chart}>
            <Bar data={monthChartData} />
          </div>
        </>
      )}
    </>
  );
}

import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from 'chart.js';
import { DataGrid } from '@mui/x-data-grid';
import { Button, ButtonGroup, Box, Typography, AppBar, Toolbar, CssBaseline, Container, MenuItem, FormControl, Select, InputLabel } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
);

const filterData = (data, sector, limit = 50) => {
  const filteredData = data.filter(item => item.sector === sector).slice(0, limit);
  return filteredData;
};

function EmissionChart() {
  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});
  const [chartType, setChartType] = useState('bar');
  const [sector, setSector] = useState('Power');
  const [originalData, setOriginalData] = useState([]);

  useEffect(() => {
    console.log('Fetching CSV data...');
    fetch('/dataset.csv')  // Fetch from public directory
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then(csvText => {
        console.log('CSV data fetched successfully.');
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          complete: (result) => {
            console.log('Parsed Data:', result.data); // Debug log
            setOriginalData(result.data);
          },
          error: (error) => {
            console.error('Error parsing CSV:', error); // Debug log
          }
        });
      })
      .catch(error => {
        console.error('Error fetching CSV:', error); // Debug log
      });
  }, []);

  useEffect(() => {
    if (originalData.length > 0) {
      const data = filterData(originalData, sector);

      setChartData({
        labels: data.map(item => item.date).filter(Boolean),
        datasets: [
          {
            label: 'Emissions',
            data: data.map(item => item.value).filter(Number),
            borderColor: 'rgba(255, 255, 255, 0.8)',
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          },
        ],
      });

      setChartOptions({
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: 'white',
            },
          },
          title: {
            display: true,
            text: 'Emission Monitoring Analysis',
            color: 'white',
          },
        },
        scales: {
          x: {
            ticks: {
              color: 'white',
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.2)',
            },
          },
          y: {
            ticks: {
              color: 'white',
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.2)',
            },
          },
        },
        layout: {
          padding: 20,
        },
        backgroundColor: 'black',
      });

      console.log('Chart data and options set successfully.');
    }
  }, [originalData, sector]);

  const renderChart = () => {
    if (chartType === 'bar') {
      return <Bar data={chartData} options={chartOptions} />;
    }
    if (chartType === 'line') {
      return <Line data={chartData} options={chartOptions} />;
    }
    if (chartType === 'table') {
      return (
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={chartData.labels.map((label, index) => ({ id: index, date: label, value: chartData.datasets[0].data[index] }))}
            columns={[
              { field: 'date', headerName: 'Date', width: 150 },
              { field: 'value', headerName: 'Emissions', width: 150 }
            ]}
            pageSize={5}
          />
        </div>
      );
    }
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="static" style={{ backgroundColor: 'black' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Emission Monitoring
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Box sx={{ my: 2 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="sector-select-label">Sector</InputLabel>
            <Select
              labelId="sector-select-label"
              id="sector-select"
              value={sector}
              label="Sector"
              onChange={(e) => setSector(e.target.value)}
            >
              <MenuItem value="Power">Power</MenuItem>
              <MenuItem value="Industry">Industry</MenuItem>
              <MenuItem value="Ground Transport">Ground Transport</MenuItem>
              <MenuItem value="Residential">Residential</MenuItem>
              <MenuItem value="Domestic Aviation">Domestic Aviation</MenuItem>
            </Select>
          </FormControl>
          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button onClick={() => setChartType('bar')}>Bar</Button>
            <Button onClick={() => setChartType('line')}>Line</Button>
            <Button onClick={() => setChartType('table')}>Table</Button>
          </ButtonGroup>
          {chartData.datasets.length > 0 ? (
            renderChart()
          ) : (
            <div>Loading...</div>
          )}
        </Box>
      </Container>
    </>
  );
}

export default EmissionChart;

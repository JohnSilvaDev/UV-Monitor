import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Registering components for Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Form = () => {
  const [currentClientPlace, setCurrentClientPlace] = useState(null);
  const [weatherToday, setWeather] = useState([]);

  useEffect(() => {
    if (currentClientPlace) {
      geocodeByAddress(currentClientPlace.label)
        .then(results => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          fetchWeatherData(lat, lng);
        })
        .catch(error => console.log('error', error));
    }
  }, [currentClientPlace]);

  const fetchWeatherData = (lat, lng) => {
    const requestOptions = {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lat, lng }),
    };
    fetch("http://localhost:3001", requestOptions)
      .then(response => response.json())
      .then(data => {
        setWeather(data);
      })
      .catch(error => console.log('Fetching weather data failed:', error));
  };

  // Preparing chart data
  const chartData = {
    labels: weatherToday.map(item => item.datetime),
    datasets: [
      {
        label: 'UV Index',
        data: weatherToday.map(item => item.uvi),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };

  // Chart options (you can customize this part as needed)
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full h-[100vh] flex flex-col items-center p-5">
      <h2 className="mb-5">UV Monitor</h2>
      <GooglePlacesAutocomplete
        apiKey={process.env.REACT_APP_API_URL}
        selectProps={{
          value: currentClientPlace,
          onChange: setCurrentClientPlace,
        }}
      />
      <div style={{ width: '600px', height: '400px', marginTop: '20px' }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Form;
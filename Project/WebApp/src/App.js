import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [trafficData, setTrafficData] = useState({
    carCount: 0,
    carSpeed: 0,
    waitingTime: 0,
    trafficLightStatus: "Unknown"
  });

  useEffect(() => {
    // Fetch traffic data from the backend API
    const fetchTrafficData = async () => {
      try {
        const response = await fetch('http://localhost:3000/traffic-data');
        const data = await response.json();
        setTrafficData(data);
      } catch (error) {
        console.error("Error fetching traffic data:", error);
      }
    };

    fetchTrafficData();
  }, []);

  return (
    <div className="App">
      <h1>Smart Traffic Light Management System</h1>
      <div className="traffic-data">
        <p>Car Count: {trafficData.carCount}</p>
        <p>Car Speed: {trafficData.carSpeed} km/h</p>
        <p>Waiting Time: {trafficData.waitingTime} seconds</p>
        <p>Traffic Light Status: {trafficData.trafficLightStatus}</p>
      </div>
    </div>
  );
}

export default App;

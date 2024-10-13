import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TrafficData() {
  const [trafficData, setTrafficData] = useState(null);

  useEffect(() => {
    // Function to fetch traffic data from the backend
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/traffic-data');
        setTrafficData(response.data);
      } catch (error) {
        console.error('Error fetching traffic data:', error);
      }
    };

    // Fetch data every 5 seconds
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <div>
      <h2>Traffic Light Data</h2>
      {trafficData ? (
        <div>
          <p>Car Count: {trafficData.carCount}</p>
          <p>Car Speed: {trafficData.carSpeed} km/h</p>
          <p>Waiting Time: {trafficData.waitingTime} seconds</p>
          <p>Traffic Light Status: {trafficData.trafficLightStatus}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default TrafficData;

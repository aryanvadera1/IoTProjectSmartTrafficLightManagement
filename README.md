
# Smart Traffic Light Management System

## Project Overview
This project is a smart traffic light management system that dynamically adjusts traffic signals based on the real-time data from simulated traffic. The system uses MQTT for sensor data simulation, Node-RED for flow-based processing, and MongoDB for storing data. A microservices architecture has been implemented, and the system is deployed on AWS with automatic scaling.

## Features
- **Real-time Traffic Data Simulation:** Data such as car count, car speed, waiting time, and traffic light status is generated and transmitted via MQTT.
- **Flow-Based Processing:** Node-RED processes the data, and it is stored in MongoDB for future analysis.
- **Microservices Architecture:** The project implements two microservices:
  - TrafficLightService: Fetches data from MongoDB and serves it to the web interface.
  - AnalyticsService: Performs analysis on traffic data to optimize traffic light timings.
- **AWS Deployment:** The system is scalable and deployed on AWS, ensuring high availability and secure scaling.
- **Front-End Web Application:** The system displays real-time traffic light updates on a web interface, where traffic light timers are dynamically adjusted based on the number of cars.

## System Architecture
- **Node-RED:** Used for flow-based processing and handling MQTT inputs.
- **MongoDB:** A NoSQL database for storing traffic data.
- **Microservices:** Built using Node.js and Express, deployed on AWS.
- **Web Interface:** A React-based front-end to display traffic light status and timers.

## Prerequisites
- Node.js
- MongoDB
- MQTT Broker (HiveMQ or any other)
- AWS EC2 for deployment
- Docker (Optional for microservices deployment)

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone IoTProjectSmartTrafficLightManagement.git
   cd traffic-light-management
   ```

2. Install the necessary dependencies:
   ```bash
   cd TrafficLightService
   npm install
   ```

3. Set up the MongoDB database:
   - Create a MongoDB cluster on MongoDB Atlas or use a local instance.
   - Update the MongoDB connection string in the server.js file of both services.

4. Set up Node-RED for flow processing:
   - Install Node-RED:
     ```bash
     npm install -g --unsafe-perm node-red
     ```
   - Import the provided flow and start processing traffic data.

5. Start the TrafficLightService:
   ```bash
   node server.js
   ```

6. Access the web application:
   - Open `http://localhost:3000` in your browser to view the traffic light system.

## Usage
- The system simulates traffic data and updates the traffic lights dynamically based on the number of cars at each intersection.
- You can also load new data by pressing the "Load New Data" button on the web interface.

## Future Scope
- Integration with AI/ML for predictive traffic management.
- Expand the system to manage multiple intersections.
- Implement a mobile application for real-time traffic updates and route planning.
- Integrate YOLO for emergency vehicle detection and prioritize their routes.

## Contributing
Feel free to contribute to this project by submitting issues or pull requests.

## License
This project is licensed under the MIT License.

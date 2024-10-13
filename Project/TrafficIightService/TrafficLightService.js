const mqtt = require('mqtt');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://vaderaaryan1505:aryan@project.hxpdp.mongodb.net/?retryWrites=true&w=majority&appName=Project';

const client = mqtt.connect('mqtt://broker.hivemq.com');

let trafficLightState = 'Green'; // Initial state

// Connect to MongoDB
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
  if (err) throw err;
  console.log('Connected to MongoDB');
  const dbo = db.db('trafficLightDB');

  client.on('connect', () => {
    console.log('Connected to MQTT Broker');
    client.subscribe(['/traffic/light/carCount', '/traffic/light/carSpeed', '/traffic/light/waitingTime', '/traffic/light/status']);
  });

  client.on('message', (topic, message) => {
    const data = JSON.parse(message.toString());
    
    if (topic === '/traffic/light/carCount') {
      const { carCount } = data;
      if (carCount > 20) {
        trafficLightState = 'Red';
      } else if (carCount > 10) {
        trafficLightState = 'Yellow';
      } else {
        trafficLightState = 'Green';
      }
    }

    // Store traffic light state in MongoDB
    const newData = {
      topic,
      payload: data,
      trafficLightState,
      timestamp: new Date(),
    };
    dbo.collection('trafficData').insertOne(newData, (err, res) => {
      if (err) throw err;
      console.log('Data saved to MongoDB');
    });
  });
});

const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://broker.hivemq.com:1883');

const carCountTopic = '/traffic/light/carCount';
const carSpeedTopic = '/traffic/light/carSpeed';
const waitingTimeTopic = '/traffic/light/waitingTime';
const statusTopic = '/traffic/light/status';

client.on('connect', () => {
  console.log('Connected to HiveMQ MQTT Broker');
  setInterval(publishData, 3000); // Publish data every 3 seconds
});

function publishData() {
  const carCount = Math.floor(Math.random() * 30) + 1; // Random car count 1-30
  const carSpeed = Math.floor(Math.random() * 71) + 10; // Random speed 10-80
  const waitingTime = Math.floor(Math.random() * 121);  // Random wait time 0-120 seconds
  const status = ['Green', 'Yellow', 'Red'][Math.floor(Math.random() * 3)]; // Random status

  // Publish each piece of data to its respective topic
  client.publish(carCountTopic, JSON.stringify({ carCount }));
  client.publish(carSpeedTopic, JSON.stringify({ carSpeed }));
  client.publish(waitingTimeTopic, JSON.stringify({ waitingTime }));
  client.publish(statusTopic, JSON.stringify({ status }));

  console.log(`Data Published: Car Count: ${carCount}, Speed: ${carSpeed}, Waiting Time: ${waitingTime}, Status: ${status}`);
}


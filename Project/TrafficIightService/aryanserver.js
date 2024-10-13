const express = require('express');
const mongoose = require('mongoose');
const app = express();

// MongoDB connection
mongoose.connect('mongodb+srv://vaderaaryan1505:aryan@project.hxpdp.mongodb.net/trafficLightDB?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Traffic data schema and model
const trafficSchema = new mongoose.Schema({
  carCount: Number,
  carSpeed: Number,
  waitingTime: Number,
  trafficLightStatus: String,
});

const TrafficData = mongoose.model('TrafficData', trafficSchema);

// Serve static files (HTML, CSS, JS) from the 'public' directory
app.use(express.static('public'));

// API route to fetch traffic data from MongoDB
app.get('/traffic-data', async (req, res) => {
  try {
    const trafficData = await TrafficData.findOne().sort({ _id: -1 }); // Get the latest data
    res.json(trafficData || { carCount: 0, carSpeed: 0, waitingTime: 0, trafficLightStatus: 'Unknown' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

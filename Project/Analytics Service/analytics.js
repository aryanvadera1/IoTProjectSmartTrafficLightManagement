const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const url = 'mongodb+srv://vaderaaryan1505:aryan@project.hxpdp.mongodb.net/?retryWrites=true&w=majority&appName=Project';

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
  if (err) throw err;
  console.log('Connected to MongoDB');
  const dbo = db.db('trafficLightDB');

  app.get('/averageSpeed', (req, res) => {
    dbo.collection('trafficData').aggregate([
      { $group: { _id: null, avgSpeed: { $avg: '$payload.carSpeed' } } }
    ]).toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });

  app.get('/averageWaitingTime', (req, res) => {
    dbo.collection('trafficData').aggregate([
      { $group: { _id: null, avgWaitingTime: { $avg: '$payload.waitingTime' } } }
    ]).toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });

  app.get('/trafficDensity', (req, res) => {
    dbo.collection('trafficData').aggregate([
      { $group: { _id: '$trafficLightState', count: { $sum: 1 } } }
    ]).toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });
});

app.listen(3001, () => {
  console.log('Analytics Service is running on port 3001');
});

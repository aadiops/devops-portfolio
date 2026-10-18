const express = require('express');
const os = require('os');

const app = express();
const port = process.env.PORT || 3000;

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'node-app', uptime: process.uptime() });
});

app.get('/api', (req, res) => {
  const payload = {
    service: 'node-app',
    status: 'running',
    environment: process.env.NODE_ENV || 'development',
    hostname: os.hostname(),
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    message: 'Node service is healthy and ready.'
  };

  res.json(payload);
});

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the DevOps Portfolio Node service',
    routes: ['/health', '/api']
  });
});

app.listen(port, () => {
  console.log(`Node service listening on port ${port}`);
});

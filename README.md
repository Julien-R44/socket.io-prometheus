# socket.io-prometheus-v3

Exposes metrics endpoints for prometheus to collect data about socket.io v3.

## Installation

## Usage 
```
const { PrometheusSocketIo } = require('socket.io-prometheus-v3')
const prometheus = PrometheusSocketIo.init({ io })

...

app.get('/metrics', async (req, res) => {
    res.send(await prometheus.getMetrics())
}) 
```

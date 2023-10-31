const express = require('express');
const app = express();
const hostname = 'localhost';
const port = 5000;
require('dotenv').config();
const axios = require('axios');



app.get('/', async(req,res) => {
    const weather = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=-16.680519&lon=-49.256130&appid=${process.env.api_key}`);
    res.send(weather.data)
    console.log(weather.data);
});

app.listen(port, hostname, () => {
    console.log(`The server is running on ${hostname}${port}`)
});

 //change
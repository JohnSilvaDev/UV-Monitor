const express = require('express');
const app = express();
const hostname = 'localhost';
const port = 5000;
require('dotenv').config();
const axios = require('axios');



app.get('/', async(req,res) => {
    const weather = await axios.get(`${process.env.API_URL_OPENUV}${process.env.API_KEY}`);
    res.send(weather.data)
    console.log(weather.data);
});

app.listen(port, hostname, () => {
    console.log(`The server is running on ${hostname}${port}`)
});
onecall?lat=&lon=&appid=
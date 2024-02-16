const express = require('express')
const app = express()
const port = 3001
require('dotenv').config();
const axios = require('axios');
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors({
    origin: "http://localhost:3000"
}));
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));


app.post('/', async (req,res) => {
  console.log(req.body)
  let lat = req.body.lat
  let lng = req.body.lng
  console.log(`${lat}${lng}`);
  const weather = await axios.get(`${process.env.API_URL_OPEN}onecall?lat=${lat}&exclude=minutely,daily&lon=${lng}&units=metric&appid=${process.env.API_KEY}`);
  res.send(weather.data);
  console.log(weather.data);
  console.log(`${process.env.API_URL_OPEN}onecall?lat=${lat}&lon=${lng}&appid=${process.env.API_KEY}`);
});
 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

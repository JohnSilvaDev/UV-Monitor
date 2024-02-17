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
  const url = `${process.env.API_URL_OPEN}onecall?lat=${lat}&exclude=minutely,daily&lon=${lng}&units=metric&appid=${process.env.API_KEY}`;
  console.log(url);
  const weather = await axios.get(url);
  
  console.log(weather.data);
  
  const dataparsed = weather.data.hourly.map((item) => {
    const myUnixTimestamp = item.dt
    const newDateTime = new Date(myUnixTimestamp * 1000);

    return {
      timestamp: item.dt,
      datetime: newDateTime.toLocaleTimeString(),
      uvi: item.uvi,
    };
  });

  res.send(dataparsed);
});


 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

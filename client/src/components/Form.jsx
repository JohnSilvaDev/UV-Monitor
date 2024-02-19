import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';


const Form = () => {

  const [ currentClientPlace, setCurrentClientPlace ] = useState()
  const [weatherToday, setWeather] = useState([]);

  console.log(currentClientPlace?.label)

  useEffect(()=>{
   if(currentClientPlace){
    geocodeByAddress(currentClientPlace?.label)
    .then(results => getLatLng(results[0]))
    .then(({ lat, lng }) => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        'lat': lat,
        'lng': lng
      });

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      fetch("http://localhost:3001", requestOptions)
        .then((data) => data.json())
        .then((data) => setWeather(data))
        .catch(error => console.log('error', error));
      console.log('Successfully got latitude and longitude', { lat, lng })
     
      
      
    });
   }  
  }, [currentClientPlace])
  
  return (
    <div className="w-full h-[100vh] flex flex-col items-center p-5">
      <h2 className="mb-5">UV Monitor </h2>
      <GooglePlacesAutocomplete
        apiKey={process.env.REACT_APP_API_URL}
        selectProps={{
          value: currentClientPlace,
          onChange: setCurrentClientPlace,
        }}
      />
      {weatherToday.map((item) => (
        <div className="bg-gray-300 p-3 rounded-lg mb-4">
          <span>{item.datetime}</span><br></br>
          <span>Radiacao - </span>
          <span>{item.uvi}</span>
        </div>
      ))}
    </div>

  )
}

export default Form
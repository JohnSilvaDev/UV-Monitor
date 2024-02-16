import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { useNavigate } from 'react-router-dom';
/* import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"; */


const Form = () => {
  
  const navigate = useNavigate()

  const [ currentClientPlace, setCurrentClientPlace ] = useState()
  //const navigate = useNavigate()

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
        .catch(error => console.log('error', error));
      console.log('Successfully got latitude and longitude', { lat, lng })
     
      navigate('/forecast', {state: {data: requestOptions.data}})
   
      
    });
   }  
  }, [currentClientPlace, navigate])
  
  return (
    <div className='w-full h-[100vh] flex justify-center items-center'>
        <GooglePlacesAutocomplete
      apiKey={process.env.REACT_APP_API_URL}
      selectProps={{value:currentClientPlace,
      onChange:setCurrentClientPlace}}
    />
        <button className='rounded-md bg-green-500'>Search</button>
    </div>
  )
}

export default Form
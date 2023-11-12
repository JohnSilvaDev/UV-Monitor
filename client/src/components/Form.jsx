import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';


const Form = () => {
  
  const [ currentClientPlace, setCurrentClientPlace ] = useState()
  
  console.log(currentClientPlace?.label)

  useEffect(()=>{
   if(currentClientPlace){
    geocodeByAddress(currentClientPlace?.label)
  .then(results => getLatLng(results[0]))
  .then(({ lat, lng }) =>
    console.log('Successfully got latitude and longitude', { lat, lng })
     
    );

   }
  }, [currentClientPlace])
  

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

export default Form
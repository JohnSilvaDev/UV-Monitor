import React from 'react'
import { useState } from 'react'


const Form = () => {
    
    const [] = useState()

  return (
    <div className='w-full h-[100vh] flex justify-center items-center'>
        <input className='border border-black rounded-md' type='text' />
        <button className='rounded-md bg-green-500'>Search</button>
    </div>
  )
}

export default Form
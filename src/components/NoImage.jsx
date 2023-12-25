import React from 'react'

export const NoImage = () => {
  return (
    <div className='conatiner-fluid text-center'>
        <img className='no-image' src={`https://my-gallery-backend-production.up.railway.app/no-image.png`} alt=""/>
        <h3>Ready to some Photo?</h3>
        <p>Drag & drop anywhere to upload</p>
    </div>
  )
}

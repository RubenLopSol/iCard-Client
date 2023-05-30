import React from 'react'
import img404 from "../public/404/404.gif"
import "./Error404.scss"

export  function Error404() {
  return (
    <div className='Error'>
        <img src={img404} alt="404" className='Error__img'/>
    </div>
  )
}

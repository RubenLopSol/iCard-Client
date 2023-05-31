import React from 'react'
import {ToastContainer} from "react-toastify"
import {Navigation} from "./routes"





export default function App() {
  return (
    <div className='app'>
      
      <Navigation/>

      <ToastContainer 
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
      
    </div>
  );
}

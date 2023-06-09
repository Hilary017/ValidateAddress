import React, { Children, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Step1 from './Components/Step1';
import Step1Footer from './Components/Step1Footer';
import './App.css'
import Step2 from './Components/Step2';
import Steps from './Components/Steps';
import Step3 from './Components/Step3';
import Finishing from './Components/Finishing';
import Error from './Components/Error';
import Home from './Components/Home';
import Backdrop from './Components/backdrop';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Step1 />,
      },
      {
        path: "step-2",
        element: <Step2 />
      },
      {
        path: "step-3",
        element: <Step3 />
      },
      {
        path: "finishing",
        element: <Finishing />
      },
    ]
  }
])

function App() {
  return (
      <>
        {/* <Step2 /> */}
        {/* <Backdrop /> */}
        <RouterProvider router={router} />
      </>
  )
}

export default App;

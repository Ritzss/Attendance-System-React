import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import MyRoutes from './Routes/MyRoutes'
import ContextProvider from './context/ContextProvider'


createRoot(document.getElementById("root")).render(
    <ContextProvider>
        <RouterProvider router={MyRoutes} />
    </ContextProvider>
    
)
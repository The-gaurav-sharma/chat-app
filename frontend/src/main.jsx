import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/react'
import { StrictMode } from 'react'
import {BrowserRouter} from "react-router"

const VITE_CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <ClerkProvider publishableKey={VITE_CLERK_PUBLISHABLE_KEY}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </ClerkProvider>
    </StrictMode> 

)

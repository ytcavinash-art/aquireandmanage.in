import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import LiaisoningPage from './LiaisoningPage.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <LiaisoningPage />
    </HelmetProvider>
  </React.StrictMode>,
)

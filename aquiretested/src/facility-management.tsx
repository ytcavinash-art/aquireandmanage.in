import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import FacilityManagementPage from './FacilityManagementPage.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <FacilityManagementPage />
    </HelmetProvider>
  </React.StrictMode>,
)

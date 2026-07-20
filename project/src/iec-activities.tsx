import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import IECActivitiesPage from './IECActivitiesPage.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <IECActivitiesPage />
    </HelmetProvider>
  </React.StrictMode>,
)

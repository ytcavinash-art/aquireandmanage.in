import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import TenantManagementPage from './TenantManagementPage.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <TenantManagementPage />
    </HelmetProvider>
  </React.StrictMode>,
)

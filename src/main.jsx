import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { LanguageProvider } from './context/LanguageContext.jsx'
import DataTableProvider from './context/DataTableContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <LanguageProvider>
     <DataTableProvider>
    <App />
    <Toaster/>
     </DataTableProvider>
     </LanguageProvider>
  </React.StrictMode>,
)

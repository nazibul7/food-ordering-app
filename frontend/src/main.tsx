import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './global.css'
import Auth0ProviderWithNavigate from './auth/Auth0ProviderWithNavigate.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0ProviderWithNavigate>
      <App />
    </Auth0ProviderWithNavigate>
  </StrictMode>,
)
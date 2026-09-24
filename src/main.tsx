import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from '@/app/App';
import '@/styles/index.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Register PWA Service Worker with auto-update check
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        // Check for updates on every page load
        registration.update().catch(() => {});
      })
      .catch(() => {});
  });
}

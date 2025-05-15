
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Toaster } from "@/components/ui/toaster";
import './index.css'

// Add animation preload flag to ensure animations play correctly
document.documentElement.classList.add('animation-ready');

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    <Toaster />
  </React.StrictMode>
);

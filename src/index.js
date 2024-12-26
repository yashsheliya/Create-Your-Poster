import React from 'react';
import ReactDOM from 'react-dom/client';  // Import from 'react-dom/client' instead of 'react-dom'
import './index.css';
import App from './App';

// Create a root using the createRoot method
const root = ReactDOM.createRoot(document.getElementById('App'));  // Pass in the root DOM element
root.render(<App />);  // Use the root.render method to render the App component

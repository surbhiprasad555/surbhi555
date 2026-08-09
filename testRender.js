import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './src/App.jsx';

try {
  console.log('Rendering App...');
  renderToString(React.createElement(App));
  console.log('Render successful!');
} catch (err) {
  console.error('Render failed:', err);
}

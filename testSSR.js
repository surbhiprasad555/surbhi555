import fs from 'fs';
import path from 'path';
import { createServer } from 'vite';

async function run() {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });

  try {
    const { render } = await vite.ssrLoadModule('/src/main.jsx');
    console.log("Loaded main.jsx successfully!");
  } catch (e) {
    console.error("Error loading main.jsx:", e);
  }
  
  process.exit();
}
run();

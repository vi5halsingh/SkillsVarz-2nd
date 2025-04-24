import { defineConfig } from 'vite';

export default defineConfig({
  // root: '/',
  publicDir: './public/', 
  server:
  {
      host: true, // Open to local network and display URL
      // open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env) // Open if it's not a CodeSandbox
  },
});

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
// import { createHtmlPlugin } from "vite-plugin-html";

// Load .env file
dotenv.config();

export default defineConfig({
  plugins: [react()],

  define: {
    // You can also use process.env here if needed
    "process.env": process.env,
  },
});

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import styleImport from 'vite-plugin-style-import';

// export default defineConfig({
//   plugins: [
//     react(),
//     styleImport({
//       libs: [
//         {
//           libraryName: 'antd',
//           esModule: true,
//           resolveStyle: (name) => `antd/es/${name}/style/index`,
//         },
//       ],
//     }),
//   ],
// });

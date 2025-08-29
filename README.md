# 🚀 useBackStackOverlay

> A React Hook in PWA style that allows you to manage overlay UIs such as modals or drawers with the browser's back button.

[![npm version](https://img.shields.io/npm/v/use-back-stack-overlay.svg)](https://www.npmjs.com/package/use-back-stack-overlay)

## 📱 Demo Comparison

<table>
  <tr>
    <td align="center"><b>Before</b></td>
    <td align="center"><b>After</b></td>
  </tr>
  <tr>
    <td>
      <img src="https://github.com/user-attachments/assets/14df3fff-92eb-4f29-aebb-efc2e96d26e7" alt="Before" width="100%">
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/1d6c74d3-3e32-4ad8-9cd4-d961fa3ff1b2" alt="After" width="100%">
    </td>
  </tr>
  <tr>
    <td align="center">Modals remain open when going back</td>
    <td align="center">Modals can be closed with back button</td>
  </tr>
</table>

## ✨ Key Features

-  🔙 Close modals, drawers, and other UI elements with the browser's back button
-  📚 When multiple overlays are open, they are closed in reverse order (last opened first)
-  📱 Provides a mobile app experience on the web similar to PWAs
-  ⚛️ Compatible with Next.js and React

## 📦 Installation

```bash
npm install use-back-stack-overlay
```

## 🔍 Usage

```jsx
import { useState } from "react";
import { useHistoryBackDrawer } from "use-back-stack-overlay";

function App() {
   // Drawer state management
   const [isDrawer1Open, setIsDrawer1Open] = useState(false);
   const [isDrawer2Open, setIsDrawer2Open] = useState(false);

   // Using the hook
   useHistoryBackDrawer([
      { isOpen: isDrawer1Open, setIsOpen: setIsDrawer1Open },
      { isOpen: isDrawer2Open, setIsOpen: setIsDrawer2Open },
   ]);

   return (
      <div>
         <button onClick={() => setIsDrawer1Open(true)}>Open Drawer 1</button>
         <button onClick={() => setIsDrawer2Open(true)}>Open Drawer 2</button>

         {isDrawer1Open && (
            <div className="drawer">
               <h2>Drawer 1</h2>
               <button onClick={() => setIsDrawer1Open(false)}>Close</button>
            </div>
         )}

         {isDrawer2Open && (
            <div className="drawer">
               <h2>Drawer 2</h2>
               <button onClick={() => setIsDrawer2Open(false)}>Close</button>
            </div>
         )}
      </div>
   );
}
```

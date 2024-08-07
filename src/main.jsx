import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import Store from './Store/Store.js'
import AnimatedCursor from './hooks/AnimatedCursor.jsx'
import {
  RouterProvider,
} from "react-router-dom";


ReactDOM.createRoot(document.getElementById('deepsinh231')).render(
  <React.StrictMode>
    <Provider store={Store}>
    <div className="cursor__dot">
        <AnimatedCursor
          innerSize={15}
          outerSize={15}
          color="255, 255 ,255"
          outerAlpha={0.4}
          innerScale={0.7}
          outerScale={5}
        />
      </div>
      <RouterProvider router={App} />
    </Provider>
  </React.StrictMode>,
)

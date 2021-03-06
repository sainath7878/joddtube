import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom"
import { SidebarProvider, AuthProvider, VideoProvider, PlayListProvider } from "context"


// Call make Server
makeServer();

ReactDOM.render(
  < React.StrictMode >
    <BrowserRouter>
      <AuthProvider>
        <SidebarProvider>
          <VideoProvider>
            <PlayListProvider>
              <App />
            </PlayListProvider>
          </VideoProvider>
        </SidebarProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode >,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Flowbite } from "flowbite-react";

const root = ReactDOM.createRoot(document.querySelector(".maytopia"));
root.render(
  <>
    <BrowserRouter>
      <Provider store={store}>
        <Flowbite>
          <App />
        </Flowbite>
        <ToastContainer draggable position="bottom-right" />
      </Provider>
    </BrowserRouter>
  </>
);

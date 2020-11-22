import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createStore } from "redux";
import reducer from "./Components/Reducer/reducer";
import { Provider } from "react-redux";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const initial = {
  todoArray: [],
  authDetails: {},
  navItem: localStorage.getItem("navTab")
};

const store = createStore(reducer, initial);

ReactDOM.render(
  <React.StrictMode>
    <Container>
      <Provider store={store}>
        <App />
      </Provider>
    </Container>
  </React.StrictMode>,
  document.getElementById("root")
);

import React from "react";
import Amplify from "aws-amplify";
import { createRoot } from "react-dom/client";

import App from "./App";
import aws_exports from "./aws-exports";
import reportWebVitals from "./reportWebVitals";

import {
  accountDataReducer,
  initialState as accountData,
} from "./reducers/accountDataReducer";
import { AccountDataProvider } from "./context/accountData";

import "./styles/style.scss";

Amplify.configure(aws_exports);

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <AccountDataProvider initialState={accountData} reducer={accountDataReducer}>
    <App />
  </AccountDataProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

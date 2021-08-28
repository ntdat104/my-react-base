import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import i18next from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import App from "./app";
import store from "./app/store";
import reportWebVitals from "./reportWebVitals";
import "./core/styles/index.scss";

// import { I18N_CONFIG } from "./app/i18n";
// i18next.use(initReactI18next).init(I18N_CONFIG);

import { I18N_LAZY_CONFIG } from "./app/i18n";
i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(I18N_LAZY_CONFIG);

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <Provider store={store}>
        <Suspense fallback="loading">
          <App />
        </Suspense>
      </Provider>
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

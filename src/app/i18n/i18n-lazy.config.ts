import type { InitOptions } from "i18next";

const I18N_LAZY_CONFIG: InitOptions = {
  lng: "en",
  fallbackLng: "en",
  debug: true,
  ns: "common",
  interpolation: { escapeValue: false }, // React already does escaping,
};

export default I18N_LAZY_CONFIG;

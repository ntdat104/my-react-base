import type { InitOptions } from "i18next";
import en from "./translations/en.json";
import vi from "./translations/vi.json";

const I18N_CONFIG: InitOptions = {
  lng: "en",
  fallbackLng: "en",
  debug: true,
  resources: {
    en: { common: en },
    vi: { common: vi },
  },
  interpolation: { escapeValue: false }, // React already does escaping,
};

export default I18N_CONFIG;

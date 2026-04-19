import type { SiteDictionary } from "./copy/types";
import { enDictionary } from "./copy/en";
import { zhDictionary } from "./copy/zh";
import type { Locale } from "./config";

export function getDictionary(locale: Locale): SiteDictionary {
  return locale === "en" ? enDictionary : zhDictionary;
}

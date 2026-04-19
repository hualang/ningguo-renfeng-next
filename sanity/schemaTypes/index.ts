import { type SchemaTypeDefinition } from "sanity";

import { homePageType } from "./homePage";
import { localeStringType, localeTextType } from "./localeBlocks";

export const schemaTypes: SchemaTypeDefinition[] = [
  localeStringType,
  localeTextType,
  homePageType,
];

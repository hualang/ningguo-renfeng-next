import { defineField, defineType } from "sanity";

/** 短句：中英两行 */
export const localeStringType = defineType({
  name: "localeString",
  title: "中英短句",
  type: "object",
  fields: [
    defineField({ name: "zh", type: "string", title: "中文" }),
    defineField({ name: "en", type: "string", title: "English" }),
  ],
});

/** 段落：中英多行 */
export const localeTextType = defineType({
  name: "localeText",
  title: "中英段落",
  type: "object",
  fields: [
    defineField({
      name: "zh",
      type: "text",
      title: "中文",
      rows: 4,
    }),
    defineField({
      name: "en",
      type: "text",
      title: "English",
      rows: 4,
    }),
  ],
});

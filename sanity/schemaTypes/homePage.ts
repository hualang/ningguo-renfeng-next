import { defineField, defineType } from "sanity";

export const homePageType = defineType({
  name: "homePage",
  title: "首页",
  type: "document",
  fields: [
    defineField({
      name: "heroTitle",
      title: "主标题（Hero）",
      type: "localeString",
      description: "首屏大标题（中英分行填写）",
    }),
    defineField({
      name: "heroLead",
      title: "副标题（一句话）",
      type: "localeText",
    }),
    defineField({
      name: "heroSub",
      title: "公司简介段落",
      type: "localeText",
    }),
    defineField({
      name: "spotlightTitle",
      title: "焦点条标题",
      type: "localeString",
    }),
    defineField({
      name: "spotlightBody",
      title: "焦点条正文",
      type: "localeText",
    }),
  ],
  preview: {
    prepare() {
      return { title: "首页内容" };
    },
  },
});

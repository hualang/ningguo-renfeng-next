import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "default",
  title: "宁国人峰 · 站点内容",
  basePath: "/studio",
  projectId: projectId || "missingProjectId",
  dataset,
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool(),
    ...(process.env.NODE_ENV === "development" ? [visionTool()] : []),
  ],
});

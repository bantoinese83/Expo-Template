import { defineConfig } from "orval";

/**
 * Orval configuration for the Expo Template.
 * Generates type-safe React Query hooks from an OpenAPI/Swagger spec.
 *
 * To use:
 * 1. Update 'input' with your Swagger JSON/YAML URL or file path.
 * 2. Run 'npm run generate:api'.
 */
export default defineConfig({
  petstore: {
    input: {
      target: "https://petstore.swagger.io/v2/swagger.json",
    },
    output: {
      mode: "tags-split",
      target: "src/api/generated/petstore.ts",
      schemas: "src/api/generated/model",
      client: "react-query",
      mock: true,
      override: {
        mutator: {
          path: "./src/api/client.ts",
          name: "default", // Uses the default export of apiClient
        },
      },
    },
  },
});

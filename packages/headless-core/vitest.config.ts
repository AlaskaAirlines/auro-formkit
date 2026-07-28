import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    name: "headless",
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});

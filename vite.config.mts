import swc from "unplugin-swc"
import tsconfigPaths from "vite-tsconfig-paths"
import { defineConfig } from "vitest/config"

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    swc.vite({
      module: { type: "es6" },
    }),
  ],
  test: {
    reporters: ["verbose"],
    globals: true,
    environmentMatchGlobs: [["src/http/controllers/**", "prisma"]],
    coverage: {
      exclude: [
        "**/src/http/routes/**",
        "**/build/**",
        "**/prisma/**",
      ],
    },
  },
})
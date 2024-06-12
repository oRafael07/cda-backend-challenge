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
        // "**/src/http/**",
        "**/src/routes/**",
        "**/build/**",
        "**/prisma/**",
        "**/src/app.ts",
        // "**/src/lib/kafka-consumers/**",
        // "**/src/@types/**",
        // "**src/config/**",
        // "**/src/lib/backup.ts",
        // "**/src/lib/messaging.ts",
        // "**/src/lib/prisma.ts",
        // "**/src/server.ts",
        // "**/src/repositories/*.ts",
        // "**/src/repositories/prisma/**",
        // "**/src/helpers/generateShortHash.ts",
      ],
    },
  },
})
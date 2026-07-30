import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    // Next.js build output
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",

    // Prisma auto-generated files — linting these is not useful
    // and causes hundreds of false-positive errors on minified runtime code.
    "lib/generated/**",

    // Coverage output
    "coverage/**",
  ]),

  // Allow CommonJS require() in Jest config and test infrastructure files.
  // These run in Node (not the browser) and must use CJS because Jest does not
  // fully support ESM transforms for config/setup/mock files.
  {
    files: [
      "jest.config.js",
      "jest.config.cjs",
      "tests/setup.js",
      "tests/__mocks__/**/*.js",
    ],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
]);

export default eslintConfig;

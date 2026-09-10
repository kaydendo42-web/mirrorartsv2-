import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Not ours to lint. `prototype/` is the pre-migration hand-written site,
    // kept as reference until the port is signed off; `extraction/` holds the
    // legacy site exactly as crawled, minified vendor scripts and all. Linting
    // them buried 300 real errors under 5,000 imported ones.
    "prototype/**",
    "extraction/**",
    "RushD homepage blueprint/**",
    "media/**",
  ]),
]);

export default eslintConfig;

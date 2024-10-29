import { Config } from "prettier";

const config = {
  semi: true,
  singleQuote: true,
  trailingComma: "all",
  printWidth: 80,
  tabWidth: 2,
  jsxSingleQuote: true,
  plugins: ["prettier-plugin-tailwindcss"],
} satisfies Config;

export default config;

//@ts-check

/**
 * @type {import("prettier").Config}
 */
const config = {
  singleQuote: true,
  trailingComma: "es5",
  tabWidth: 2,
  semi: true,
  quoteProps: "as-needed",
  jsxSingleQuote: false,
  bracketSpacing: true,
  bracketSameLine: false,
  proseWrap: "preserve",
  htmlWhitespaceSensitivity: "css",
  endOfLine: "lf",
  plugins: ["prettier-plugin-tailwindcss"],
};

export default config;

/** Runs on every commit via Husky (.husky/pre-commit). */
const config = {
  "*.{js,mjs,cjs,ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{json,md,css,yml,yaml}": ["prettier --write"],
};

export default config;

import js from '@eslint/js';
import globals from 'globals';
import prettierConfig from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: globals.browser, // ganti globals.node kalau backend
    },
  },
  prettierConfig, // WAJIB paling akhir, biar rule format ESLint dimatikan
];

module.exports = [
  {
    languageOptions: {
      globals: {
        document: "readonly",
        window: "readonly",
        localStorage: "readonly",
        TRANSLATIONS: "readonly",
        PREVIEW_BOARD: "readonly"
      }
    },
    rules: {
      "no-undef": "error"
    }
  }
];

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    // "prettier/prettier":["error",{
    //   "endOfLine":"auto"
    // }],
    "no-control-regex": 0,
    "prettier/prettier": "off",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-unused-vars":"off",
    "vue/no-unused-components": "off",
    "vue/multi-word-component-names":"off",
  },
};

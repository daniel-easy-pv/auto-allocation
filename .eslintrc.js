module.exports = {
  env: {
    browser: true,
    commonjs: false,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  globals: {
    test: true,
    expect: true,
  },
  rules: {
    indent: 'off',
  },
};

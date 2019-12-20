module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    //  "airbnb"
    // 'eslint:recommended'
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    // "indent": [4, "tab"],
    // "no-tabs": 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}

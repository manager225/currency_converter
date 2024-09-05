module.exports = {
  extends: ['plugin:vue/recommended', 'plugin:prettier/recommended'],
  rules: {
    'curly': 'off',
    'no-console': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/html-self-closing': 'off',
    'vue/no-multiple-template-root': 'off',
    'quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    'semi': ['error', 'never'],
    'max-len': [
      'error',
      {
        code: 120,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreComments: true
      }
    ],
    'quote-props': ['error', 'consistent'],
    'vue/multi-word-component-names': 'off'
  },
  overrides: [
    {
      files: ['**/*.vue'],
      rules: {
        'vue/max-attributes-per-line': 'off'
      }
    }
  ]
}

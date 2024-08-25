import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: {
    css: true,
    html: true,
    markdown: 'prettier',
  },
  react: true,
  rules: {
    'antfu/top-level-function': 'off',
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
  },
})

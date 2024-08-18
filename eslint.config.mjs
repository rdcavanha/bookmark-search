import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'antfu/top-level-function': 'off',
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
  },
})

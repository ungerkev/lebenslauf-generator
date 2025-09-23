export default {
  singleQuote: true,
  printWidth: 80,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: ['^@?[a-zA-Z0-9]', '^@/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderParserPlugins: ['typescript', 'tsx', 'decorators-legacy', 'jsx'],
};
// @ts-check

/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
module.exports = {
    // Standard prettier options
    singleQuote: true,
    semi: true,
    trailingComma: 'es5',
    bracketSpacing: true,
    bracketSameLine: false,
    jsxSingleQuote: true,

    // Since prettier 3.0, manually specifying plugins is required
    plugins: ['@ianvs/prettier-plugin-sort-imports'],
    // This plugin's options
    importOrder: ['^@core/(.*)$', '', '^@server/(.*)$', '', '^@ui/(.*)$', '', '^[./]'],
    importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
    importOrderTypeScriptVersion: '5.0.0',
};
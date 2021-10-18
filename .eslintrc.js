module.exports = {
    root: true,
    env: {
        node: true,
        jest: true
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module'
    },
    plugins: ['@typescript-eslint', 'nestjs', 'prettier'],
    extends: [
        'plugin:nestjs/recommended',
        'airbnb-typescript/base',
        'plugin:@typescript-eslint/recommended',
        'prettier'
    ],
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        "import/prefer-default-export": "off",
        "class-methods-use-this": "off",
        "prettier/prettier": "error",
        "arrow-body-style": "off",
        "prefer-arrow-callback": "off",
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off'
    }
}

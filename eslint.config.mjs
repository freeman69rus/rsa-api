import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
    { ignores: ['dist/'] },
    {
        files: ['**/*.{js,ts}', 'test/**/*.{js,ts}']
    },
    { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
    { languageOptions: { globals: globals.node } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        rules: {
            indent                : ['error', 4, { SwitchCase: 1 }],
            quotes                : ['error', 'single', { allowTemplateLiterals: true }],
            'key-spacing'         : ['error', { align: 'colon' }],
            'comma-spacing'       : ['error', { before: false, after: true }],
            semi                  : ['error', 'always'],
            'space-in-parens'     : ['error', 'never'],
            'keyword-spacing'     : ['error', { after: true, before: true }],
            'object-curly-spacing': [
                'error',
                'always',
                { objectsInObjects: true }
            ],
            'array-bracket-spacing'        : ['error', 'never'],
            'computed-property-spacing'    : ['error', 'never'],
            curly                          : ['error', 'all'],
            'brace-style'                  : ['error', '1tbs'],
            'arrow-parens'                 : ['error', 'always'],
            'max-len'                      : ['error', { code: 300 }],
            'no-useless-catch'             : 'off',
            'no-useless-escape'            : 'off',
            'no-extra-boolean-cast'        : 'off',
            'no-duplicate-imports'         : 'error',
            'no-multi-spaces'              : 'error',
            'no-multiple-empty-lines'      : ['error', { max: 1 }],
            'comma-dangle'                 : ['error', 'never'],
            'array-bracket-newline'        : ['error', { multiline: true }],
            'dot-location'                 : ['error', 'property'],
            'no-whitespace-before-property': 'error',
            'padded-blocks'                : ['error', 'never'],
            'switch-colon-spacing'         : ['error', { after: true, before: false }],
            'multiline-ternary'            : ['error', 'always-multiline'],
            'space-infix-ops'              : 'error',
            'lines-around-comment'         : [
                'error',
                {
                    beforeBlockComment: true,
                    beforeLineComment : true,
                    allowBlockStart   : true
                }
            ],
            '@typescript-eslint/no-explicit-any'          : 'off',
            '@typescript-eslint/no-unused-vars'           : 'off',
            '@typescript-eslint/no-this-alias'            : 'off',
            '@typescript-eslint/ban-ts-comment'           : 'off',
            '@typescript-eslint/no-unused-expressions'    : 'off',
            '@typescript-eslint/no-async-promise-executor': 'off',
            'no-async-promise-executor'                   : 'off',
            '@typescript-eslint/no-empty-object-type'     : 'off'
        }
    }
];

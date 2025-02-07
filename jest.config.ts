/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {

    // Automatically clear mock calls, instances, contexts and results before every test
    clearMocks: true,

    // Indicates which provider should be used to instrument code for coverage
    coverageProvider: 'v8',

    // A map from regular expressions to paths to transformers
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    }
};

export default config;

import type {Config} from '@jest/types';
// Sync object

const config: Config.InitialOptions = {
    verbose: true,
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testMatch: ["**/tests/**/*.test.ts?(x)"],
};
export default config;

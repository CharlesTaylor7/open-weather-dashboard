import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

export default {
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
  testRegex: 'test\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  moduleNameMapper: {
    ".+\\.svg$": "<rootDir>/__mocks__/empty.js",
   // jest-transform-stub",
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  },
};

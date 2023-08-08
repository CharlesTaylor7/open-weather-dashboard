import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

export default {
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.tsx?$': ['@swc/jest'],
  },
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect'
  ],
  testRegex: 'test\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  moduleNameMapper: {
    '.+\\.svg$': '<rootDir>/__mocks__/empty.js',
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  },
};

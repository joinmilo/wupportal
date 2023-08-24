import type { CodegenConfig } from '@graphql-codegen/cli';
import { graphqlGenerationApi } from './constants';

const config: CodegenConfig = {
  schema: graphqlGenerationApi,
  generates: {
    'src/app/core/api/generated/schema.ts': {
      documents: [
        './src/app/core/api/documents/fragments/**/*.graphql',
      ],
      plugins: [
        'typescript',
        {
          'add': {
            content: '/* eslint-disable */'
          }
        }
      ],
      config: {
        maybeValue: 'T | null | undefined',
      },
    },
    'src/app/core/api/generated': {
      documents: [
        './src/app/core/api/documents/**/*.graphql',
      ],
      preset: 'near-operation-file-preset',
      presetConfig: {
        baseTypesPath: 'schema.ts',
        folder: '../../generated'
      },
      plugins: [
        'typescript-operations',
        'typescript-apollo-angular',
        {
          'add': {
            content: '/* eslint-disable */'
          }
        }
      ],
      config: {
        addExplicitOverride: true,
      },
    },
  },
};
export default config;
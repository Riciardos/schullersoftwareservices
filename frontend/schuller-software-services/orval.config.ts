import { defineConfig } from 'orval';

export default defineConfig({
  schullerApi: {
    input: '../../spec/openapi.yml',
    output: {
      mode: 'tags-split',
      target: './src/api/generated',
      client: 'axios',
      override: {
        mutator: {
          path: './src/api/client.ts',
          name: 'apiClient',
        },
      },
    },
  },
});

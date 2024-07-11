import sharedConfig from '@epreston/eslint-config';

export default [
  ...sharedConfig,
  {
    rules: {
      'prettier/prettier': 'off'
    }
  }
];

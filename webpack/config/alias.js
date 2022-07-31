import { join } from 'path';

import { rootDir } from '../utils/env';

export const aliasItems = {
  '@api': join(rootDir, '/src/api'),
  '@app': join(rootDir, '/src/app'),
  '@images': join(rootDir, '/src/assets/images'),
  '@icons': join(rootDir, '/src/assets/icons'),
  '@components': join(rootDir, '/src/components'),
  '@hooks': join(rootDir, '/src/hooks'),
  '@pages': join(rootDir, '/src/pages'),
  '@routes': join(rootDir, '/src/routes'),
  '@types': join(rootDir, '/src/shared/types'),
  '@utils': join(rootDir, '/src/shared/utils'),
  '@validators': join(rootDir, '/src/shared/validators'),
  '@store': join(rootDir, '/src/store'),
  '@styles': join(rootDir, '/src/styles'),
};

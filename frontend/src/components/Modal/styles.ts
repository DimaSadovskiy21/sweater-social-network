import styled from 'styled-components';

import { IOverlineProps } from './types';

export const Overline = styled('div')<IOverlineProps>(({ isAnimation }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'var(--overline)',
  zIndex: 1000,
  transform: isAnimation ? 'translateY(0)' : 'translateY(100%)',
  animation: `${isAnimation ? 'slideIn' : 'slideOut'} 0.5s ease-in-out`,
  '@keyframes slideIn': {
    from: {
      transform: 'translateY(-100%)',
    },
    to: {
      transform: 'translateY(0)',
    },
  },
  '@keyframes slideOut': {
    from: {
      transform: 'translateY(0)',
    },
    to: {
      transform: 'translateY(100%)',
    },
  },
}));

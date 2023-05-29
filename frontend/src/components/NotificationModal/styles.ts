import styled from 'styled-components';

import { Button } from 'components/Button';

import { IModalContainerProps } from './types';

export const ModalContainer = styled('div')<IModalContainerProps>(({ isAnimation }) => ({
  position: 'fixed',
  top: '50%',
  left: '50%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '16px',
  alignItems: 'center',
  minHeight: '360px',
  minWidth: '350px',
  padding: '20px',
  borderRadius: '10px',
  backgroundColor: 'var(--background)',
  zIndex: 1000,
  transform: isAnimation ? 'translate(-50%, -50%)' : 'translate(200%, 200%)',
  animation: `${isAnimation ? 'slideInLeft' : 'slideOutRight'} 0.5s ease-in-out`,
  '@keyframes slideInLeft ': {
    from: {
      transform: 'translate(-200%, -200%)',
    },
    to: {
      transform: 'translate(-50%, -50%)',
    },
  },
  '@keyframes slideOutRight ': {
    from: {
      transform: 'translate(-50%, -50%)',
    },
    to: {
      transform: 'translate(200%, 200%)',
    },
  },
}));

export const MessageWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
  maxWidth: '350px',
});

export const Message = styled('p')({
  textAlign: 'center',
  color: 'var(--blue)',
});

export const ButtonStyled = styled(Button)({
  width: '100%',
});

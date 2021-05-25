import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(() => ({
  root: {
    '& .home-center': {
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      '& .fb-logo': {
        width: '30vw',
        height: '30vh',
      },
    },
  },
}));

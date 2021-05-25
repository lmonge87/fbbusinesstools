import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ COLORS: { PRIMARY_COLOR_GRAY, GRAY_COLOR } }) => ({
    root: {
      '& .ml-auto': {
        display: 'flex',
        alignItems: 'center',
        '& .icon': {
          height: '3vh',
          width: '3vw',
          color: GRAY_COLOR,
        },
        '& .icon:hover': {
          color: PRIMARY_COLOR_GRAY,
        },
      },
    },
  })
);

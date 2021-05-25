import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ COLORS: { GRAY_COLOR_LIGHT, TEXT_COLOR_DARK } }) => ({
    root: {
      '& nav.nav-tabs a.nav-link.active': {
        backgroundColor: GRAY_COLOR_LIGHT,
        color: TEXT_COLOR_DARK,
      },
    },
  })
);

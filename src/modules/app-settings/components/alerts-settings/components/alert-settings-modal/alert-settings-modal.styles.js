import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ COLORS: { MODAL_BACKGROUND_COLOR, WHITE_COLOR } }) => ({
    root: {
      '& .modal-content': {
        backgroundColor: MODAL_BACKGROUND_COLOR,
        '& .close': {
          color: WHITE_COLOR,
        },
      },
    },
  })
);

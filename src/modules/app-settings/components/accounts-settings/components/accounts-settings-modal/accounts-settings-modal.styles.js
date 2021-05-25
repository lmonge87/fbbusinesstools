import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({
    COLORS: { MODAL_BACKGROUND_COLOR, WHITE_COLOR, DANGER_RED },
    FONT_SIZES: { TEXT_BODY_5 },
    GUTTERS: { PADDING_1 },
  }) => ({
    root: {
      '& .modal-content': {
        backgroundColor: MODAL_BACKGROUND_COLOR,
        '& .close': {
          color: WHITE_COLOR,
        },
      },
    },
    multiSelectRoot: {
      width: '100%',
      '& .selected-alerts-group': {
        fontSize: TEXT_BODY_5,
        marginBottom: '2px',
        borderRadius: '5px',
        '& .selected-alert': {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: PADDING_1,
          '& svg': {
            color: DANGER_RED,
            cursor: 'pointer',
          },
        },
      },
    },
  })
);

import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({
    COLORS: { MODAL_BACKGROUND_COLOR, WHITE_COLOR, DANGER_RED },
    FONT_SIZES: { TEXT_BODY_5 },
    GUTTERS: { PADDING_1, MARGIN_2 },
  }) => ({
    root: {
      '& .modal-content': {
        backgroundColor: MODAL_BACKGROUND_COLOR,
        '& .close': {
          color: WHITE_COLOR,
        },
      },
    },
    multiSelectAlertsRoot: {
      width: '100%',
      '& .selected-items-group': {
        fontSize: TEXT_BODY_5,
        marginBottom: '2px',
        borderRadius: '5px',
        '& .selected-item': {
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
    startConfigSelectorRoot: {
      marginBottom: MARGIN_2,
      '& .controls-row': {
        display: 'flex',
        alignItems: 'center',
      },
    },
  })
);

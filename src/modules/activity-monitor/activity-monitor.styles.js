import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ FONT_SIZES: { TEXT_BODY_4, TEXT_BODY_5 } }) => ({
    root: {
      '& .campaign-details': {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        fontSize: TEXT_BODY_5,
        padding: '.25rem .5rem',
      },
      '& .alert-list-item': {
        padding: '.25rem 1rem',
      },
      '& .flex-column': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        fontSize: TEXT_BODY_4,
        '& div,span': {
          marginTop: '5px',
        },
      },
    },
  })
);

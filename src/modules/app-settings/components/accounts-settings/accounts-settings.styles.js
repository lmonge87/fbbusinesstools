import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(
  ({ FONT_SIZES: { TEXT_BODY_4, TEXT_BODY_5 } }) => ({
    root: {
      '& .collapse,.collapsing': {
        fontSize: TEXT_BODY_4,
      },
      '& .alert-details': {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        fontSize: TEXT_BODY_5,
        padding: '.25rem .5rem',
      },
      '& .collapse .card-body, .collapsing .card-body': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        '& div,span': {
          marginTop: '5px',
        },
      },
    },
  })
);

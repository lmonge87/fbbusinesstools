import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(({ GUTTERS: { MARGIN_1 } }) => ({
  root: {
    '& .button-container': {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
    },
    '& button.btn': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '4vh',
      marginRight: MARGIN_1,
    },
    ' & .accordion>.card>.card-header': {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
    '& .card-header': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  },
}));

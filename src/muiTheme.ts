import { createMuiTheme } from '@material-ui/core/styles';

const muiTheme = createMuiTheme({
  typography: {
    fontFamily: ['"Noto Sans KR"', 'sans-serif'].join(','),
  },
});

export default muiTheme;

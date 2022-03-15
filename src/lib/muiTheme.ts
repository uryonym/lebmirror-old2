import { createTheme } from '@mui/material'

const muiTheme = createTheme({
  typography: {
    fontFamily: ['"Noto Sans JP"', 'sans-serif'].join(','),
    fontWeightRegular: 500,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
})

export default muiTheme

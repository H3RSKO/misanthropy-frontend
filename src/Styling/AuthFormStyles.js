// import { makeStyles } from '@mui/material/styles';
import theme from './IndexStyle'

const authFormStyles = {
  borderBox: {
    borderColor: '#4D8FAC',
  },
  root: {
    backgroundColor: 'rgba(0,50,46,0.85)',
    color: 'primary',
    padding: '2em',
    fontSize: 32,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: 'red',
    fontSize: '0.5em',
  },
  disclaimer: {
    fontSize: 15,
    color: '#aeffff'
  }
}

export default authFormStyles

import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from 'components/Snackbar'
import { GoogleLogin } from 'react-google-login';
import { logIn } from 'actions'
import { connect } from 'react-redux'
import { push } from "connected-react-router";



import TextInput from 'components/TextInput';
import useLoginForm from 'hooks/useLoginForm';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  glogin: {
    width: '100%',
    justifyContent: 'center',
    fontSize: '0.875rem !important',
    margin: theme.spacing(1, 0, 2),
    boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12) !important'
  }
}));

const LoginComponent = ({logIn, push}) => {
  const classes = useStyles();
  const { inputs, handleInputChange, handleSubmit } = useLoginForm();
  const [open, setOpen] = React.useState(false)

  const handleGoogleLogin = (response) => {
    const token = response.Zi.id_token
    logIn(token)
    push('/')
  }

  const handleSubmitWrapper = async (event) => {
    const result = await handleSubmit(event)
    const token = result.access_token
    if (token) {
      setOpen(prev => !prev)
      logIn(token)
      setTimeout(() =>{
        push('/')
      }, 5000)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Snackbar variant="success" message="Sign in Successful. Redirecting to Editor" isOpen={open}/>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={handleSubmitWrapper} className={classes.form} noValidate>
          <TextInput
            onChange={handleInputChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={inputs.email}
          />
          <TextInput
            onChange={handleInputChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={inputs.password}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <GoogleLogin
            clientId="688456308716-0n4h02s30uf3bnsssplskvmnbmfom47g.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={handleGoogleLogin}
            onFailure={handleGoogleLogin}
            cookiePolicy={'single_host_origin'}
            className={classes.glogin}
          />
          <Grid container>
            <Grid item xs>
              <Link to='/forgot' variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to='/register' variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

const mapDispatchToProps = dispatch => ({
  logIn: (token) => dispatch(logIn(token)),
  push: (route) => dispatch(push(route))
})

export default connect(
  null,
  mapDispatchToProps
)(LoginComponent);
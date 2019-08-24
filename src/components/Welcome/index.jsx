import React from 'react'
import { Dialog, DialogActions, Button, DialogTitle, DialogContent} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
    dialogActions: {
        display: 'flex',
        flexDirection: 'column',
        padding: '22px 0'
    },
    button: {
        width: '80%'
    },
    buttonDiv: {
        width: '100%',
        margin: '5px 0',
        textAlign: 'center'
    },
    loginLink: {
        textDecoration: 'none',
        color: '#fff',
        display: 'block',
        width: '100%'
    }
}))

const Welcome = ({isModalOpen, getNewPresentation}) => {
    const classes = useStyles();
    const { t } = useTranslation();
    return (
        <div>
            <Dialog open={isModalOpen} disableScrollLock={true} style={{ padding: '0px 0px 0px 0px' }}>
                {/* <DialogTitle id="alert-dialog-title">{t(`welcome.editor`)}!</DialogTitle>
                <DialogContent>{t(`presentation.create.new`)}</DialogContent> */}
                <DialogActions className={classes.dialogActions}>
                    <div className={classes.buttonDiv}>
                        {/* <Button variant="contained" color="primary" className={classes.button} onClick={getNewPresentation}>
                            {t(`presentation.new`)}
                        </Button> */}
                        <Button variant="contained" color="primary" className={classes.button} onClick={getNewPresentation}>
                            New Presentation
                        </Button>
                    </div>
                    <div className={classes.buttonDiv}>
                        <Button variant="contained" color="secondary" className={classes.button}>
                            {/* <Link className={classes.loginLink} to='/login'>{t(`login.button`)}</Link> */}
                            <Link className={classes.loginLink} to='/login'>Login</Link>
                        </Button>
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Welcome
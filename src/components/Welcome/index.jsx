import React from 'react'
import { Dialog, DialogActions, Button, DialogTitle, DialogContent} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

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
    }
}))

const Welcome = ({isModalOpen, getNewPresentation}) => {
    const classes = useStyles();
    return (
        <div>
            <Dialog open={isModalOpen} disableScrollLock={true} style={{ padding: '0px 0px 0px 0px' }}>
                <DialogTitle id="alert-dialog-title">Welcome!</DialogTitle>
                <DialogContent>Please create a new presentation or login to continue.</DialogContent>
                <DialogActions className={classes.dialogActions}>
                    <div className={classes.buttonDiv}>
                        <Button variant="contained" color="primary" className={classes.button} onClick={getNewPresentation}>
                            New Presentation
                        </Button>
                    </div>
                    <div className={classes.buttonDiv}>
                        <Button variant="contained" color="secondary" className={classes.button}>
                            Login
                        </Button>
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Welcome
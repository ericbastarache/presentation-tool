import React from 'react'
import { Dialog, DialogActions, Button, DialogTitle, DialogContent} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    modal: {
        borderRadius: '4px',
        border: '2px solid #1976d2'
    },
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

const Welcome = ({isModalOpen, createPresentation}) => {
    const classes = useStyles();
    return (
        <div className={classes.modal}>
            <Dialog open={isModalOpen}>
                <DialogTitle id="alert-dialog-title">Welcome!</DialogTitle>
                <DialogContent>Please create a new presentation or login to continue.</DialogContent>
                <DialogActions className={classes.dialogActions}>
                    <div className={classes.buttonDiv}>
                        <Button variant="contained" color="primary" className={classes.button} onClick={createPresentation}>
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
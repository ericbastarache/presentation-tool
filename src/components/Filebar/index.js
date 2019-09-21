import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import File from './children/File';

const useStyles = makeStyles(theme => ({
    buttonContainer: {
      margin : theme.spacing(1)
    },
    wrapper: {
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderBottomColor: theme.palette.grey['300'],
    }
}));

const Filebar = () => {
    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <div className={classes.buttonContainer}>
                <File />
            </div>
        </div>
    )
}

export default Filebar;
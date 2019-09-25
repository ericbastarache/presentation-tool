import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import AddSlide from './children/AddSlide';
import DeleteSlide from './children/DeleteSlide';

import AddText from './children/AddText';
import AddShape from './children/AddShape';

import FontSize from './children/FontSize';
import SetBold from './children/SetBold';


const useStyles = makeStyles(theme => ({
    buttonContainer: {
      margin : theme.spacing(1)
    },
    wrapper: {
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderBottomColor: theme.palette.grey['300'],
        display: 'flex'
    },
    divided: {
        borderLeftWidth: '1px',
        borderLeftStyle: 'solid',
        borderLeftColor: theme.palette.grey['300'],
        display: 'flex'
    }
}));

const Toolbar = ({canvas}) => {
    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <div className={classes.buttonContainer}>
                <AddSlide />
            </div>
            <div className={classes.buttonContainer}>
                <DeleteSlide />
            </div>
            <div className={classes.divided}>
                <div className={classes.buttonContainer}>
                    <AddText canvas={canvas} />
                </div>
                <div className={classes.buttonContainer}>
                    <AddShape canvas={canvas} />
                </div>
            </div>
            <div className={classes.divided}>
                <div className={classes.buttonContainer}>
                    <FontSize canvas={canvas} />
                </div>
                <div className={classes.buttonContainer}>
                    <SetBold canvas={canvas} />
                </div>
            </div>
        </div>
    )
}

export default Toolbar;
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import AddSlide from './children/AddSlide';
import DeleteSlide from './children/DeleteSlide';
import ClearCanvas from './children/ClearCanvas';

import AddText from './children/AddText';
import AddShape from './children/AddShape';
import Clipboard from './children/Clipboard';
import UndoRedo from './children/UndoRedo';

import FontSize from './children/FontSize';
import SetBold from './children/SetBold';
import SetItalic from './children/SetItalic';
import SetUnderline from './children/SetUnderline';
import SetLinethrough from './children/SetLinethrough';

import AddImage from './children/AddImage';
import UploadImage from './children/UploadImage';

import SetDirection from './children/SetDirection';


const useStyles = makeStyles(theme => ({
    buttonContainer: {
        margin: theme.spacing(1)
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
        display: 'flex',
        alignItems: 'center'
    },
    groupWrapper: {
        display: 'flex',
        alignItems: 'center'
    }
}));

const Toolbar = ({ canvas }) => {
    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <div className={classes.groupWrapper}>
                <div className={classes.buttonContainer}>
                    <AddSlide />
                </div>
                <div className={classes.buttonContainer}>
                    <DeleteSlide />
                </div>
                <div className={classes.buttonContainer}>
                    <ClearCanvas canvas={canvas} />
                </div>
            </div>
            <div className={classes.divided}>
                <div className={classes.buttonContainer}>
                    <AddText canvas={canvas} />
                </div>
                <div className={classes.buttonContainer}>
                    <AddShape canvas={canvas} />
                </div>
                <div className={classes.buttonContainer}>
                    <Clipboard canvas={canvas} />
                </div>
                <div className={classes.buttonContainer}>
                    <UndoRedo canvas={canvas} />
                </div>
            </div>
            <div className={classes.divided}>
                <div className={classes.buttonContainer}>
                    <FontSize canvas={canvas} />
                </div>
                <div className={classes.buttonContainer}>
                    <SetBold canvas={canvas} />
                </div>
                <div className={classes.buttonContainer}>
                    <SetItalic canvas={canvas} />
                </div>
                <div className={classes.buttonContainer}>
                    <SetUnderline canvas={canvas} />
                </div>
                <div className={classes.buttonContainer}>
                    <SetLinethrough canvas={canvas} />
                </div>
            </div>
            <div className={classes.divided}>
                <div className={classes.buttonContainer}>
                    <AddImage />
                </div>
                <div className={classes.buttonContainer}>
                    <UploadImage canvas={canvas} />
                </div>
            </div>
            <div className={classes.divided}>
                <SetDirection canvas={canvas} />
            </div>
        </div>
    )
}

export default Toolbar;
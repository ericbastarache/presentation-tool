import React from 'react';
import Grid from '@material-ui/core/Grid';
import Filebar from 'components/Filebar';
import Toolbar from 'components/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import { EditorContext } from 'components/Editor/context';

const useStyles = makeStyles(theme => ({
    grid: {
        backgroundColor: theme.palette.grey['100']
    }
}));

const Editormenu = ({}) => {
    const { canvas } = React.useContext(EditorContext);
    const classes = useStyles();
    return (
        <Grid item xs={12} className={classes.grid}>
            <Filebar canvas={canvas} />
            <Toolbar canvas={canvas} />
        </Grid>
    )

}

export default Editormenu;
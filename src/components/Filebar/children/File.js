import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const useStyles = makeStyles(theme => ({
    Menulist: {
      marginLeft : theme.spacing(0)
    },
    activeButton: {
        backgroundColor: blue['300']
    },
    button: {
        color: blue['800'],
        '&:hover': {
            backgroundColor: blue['100'],
         },
    },
    paper: {
        left: '8px !important',
        backgroundColor: blue['50'],
    },
}));

const onMouseEnter = (e) => e.target.style.backgroundColor = blue['100'];
const onMouseLeave = (e) => e.target.style.backgroundColor = blue['50'];

const File = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);


    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    return (
        <>
            <Button 
            aria-controls="file-menu" 
            aria-haspopup="true" 
            onClick={handleMenuOpen} 
            className={(Boolean(anchorEl)) ? classes.activeButton : classes.button}
            >
                File
            </Button>            
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                className={classes.Menulist}
                PaperProps={{ className: classes.paper}}
            >
            <MenuItem 
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={handleClose}
                >
                    Share
            </MenuItem>
            <MenuItem 
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={handleClose}
                >
                    Export
            </MenuItem>
            <MenuItem 
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={handleClose}
                >
                    Print
            </MenuItem>
        </Menu>
        </>
    )
}

export default File;
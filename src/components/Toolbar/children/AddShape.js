import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import {fabric} from 'fabric';
import blue from '@material-ui/core/colors/blue';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShapes } from '@fortawesome/free-solid-svg-icons';
import { 
        faPlusSquare,
        faPlusCircle,
        faCaretUp
} from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';


const useStyles = makeStyles(theme => ({
    Menulist: {
      marginLeft : theme.spacing(0),
      '& ul': {
          display: 'flex',
          padding: '0'
      }
    },
    activeButton: {
        backgroundColor: blue['100']
    },
    button: {
         padding: '6px',
         margin: '-4px 0px -5px -6px'
    },
    paper: {
        backgroundColor: blue['50'],
    },
    triangle: {
        fontSize: '24px'
    }
}));

const onMouseEnter = (e) => e.target.style.backgroundColor = blue['100'];
const onMouseLeave = (e) => e.target.style.backgroundColor = blue['50'];

const AddShape = ({canvas, slideCount}) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);


    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const addShape = (shapeType) => {
        switch (shapeType) {
          case 'square':
            canvas.add(new fabric.Rect({
              width: 100,
              height: 100,
              x: 200,
              y: 200,
              fill: '#ff0000'
            }));
            handleClose();
            return;
        case 'circle':
            canvas.add(
                new fabric.Circle({
                x: 200,
                y: 200,
                radius: 100,
                fill: '#ff0000',
              })
            )
            handleClose();
            return;
            case 'triangle':
            canvas.add(
                new fabric.Triangle({
                    width: 100,
                    height: 100,
                    x: 200,
                    y: 200,
                    fill: '#ff0000'
                })
            )
            handleClose();
            return;
          default:
            break;
        }
      }

    return (
        <>
            <IconButton 
                onClick={handleMenuOpen} 
                variant="contained" 
                size="small" 
                color="primary" 
                className={(Boolean(anchorEl)) ? `${classes.activeButton} ${classes.button}` : classes.button}
                disabled={!Boolean(slideCount)}
            >
                <FontAwesomeIcon icon={faShapes} />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                className={classes.Menulist}
                PaperProps={{ className: classes.paper}}
            >
            <MenuItem 
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={() => addShape('square')}
                >
                <FontAwesomeIcon icon={faPlusSquare} />
            </MenuItem>
            <MenuItem 
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={() => addShape('circle')}
                >
                <FontAwesomeIcon icon={faPlusCircle} />
            </MenuItem>
            <MenuItem 
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={() => addShape('triangle')}
                className={classes.triangle}
                >
                <FontAwesomeIcon icon={faCaretUp} />
            </MenuItem>
        </Menu>
        </>
    )
}

const mapStateToProps = state => ({
    slideCount : state.presentation.get('slide_count'),
})

export default connect(
    mapStateToProps
)(AddShape)
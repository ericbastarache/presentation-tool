import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import {fabric} from 'fabric';
import blue from '@material-ui/core/colors/blue';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShapes } from '@fortawesome/free-solid-svg-icons';
import { 
        faPlusSquare,
        faPlusCircle,
} from '@fortawesome/free-solid-svg-icons';
import {ReactComponent as TriangleIcon} from 'media/icons/triangle_icon.svg';
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
}));

const onMouseEnter = (e) => e.target.style.backgroundColor = blue['100'];
const onMouseLeave = (e) => e.target.style.backgroundColor = blue['50'];

const AddShape = ({canvas, slideCount}) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isOpen, setIsOpen] = React.useState(false);


    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
        setIsOpen(true);
    }

    const handleClose = () => {
        setAnchorEl(null);
        setIsOpen(false);
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
        <Tooltip title="Add Shape">
            <div>
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
            </div>
        </Tooltip>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={isOpen}
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
                    onClick={(e) => {addShape('square'); onMouseLeave(e)}}
                    >
                        <Tooltip title="Add Square">
                            <div>
                                <FontAwesomeIcon icon={faPlusSquare}/>
                            </div>
                        </Tooltip>
                </MenuItem>        
            <MenuItem 
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={(e) => {addShape('circle'); onMouseLeave(e)}}
                >
                <Tooltip title="Add Circle">
                    <div>
                        <FontAwesomeIcon icon={faPlusCircle} />
                    </div>
                </Tooltip>
            </MenuItem>
            <MenuItem 
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={(e) => {addShape('triangle'); onMouseLeave(e)}}
                >
                <Tooltip title="Add Triangle">
                    <div>
                        <TriangleIcon />
                    </div>
                </Tooltip>
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
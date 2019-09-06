import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ReactSearchBox  from 'react-search-box';
import useImageSearch from 'hooks/useImageSearch';
import InfiniteScroll from 'react-infinite-scroll-component';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { connect } from 'react-redux';
import {debounce} from 'lodash';


const useStyles = makeStyles(theme => ({
    dialogTitle: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    gridListContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: '100%'
    },
    dialog: {
        minHeight: '300px',
        minWidth: '360px'
    },
    scrollContainer: {
        width: '100%'
    }
  }));

const ImageSearch = ({open, setOpen, token}) => {

    const [images, setImages] = useState([])
    const classes = useStyles();
    const { handleSubmit } = useImageSearch();

    const handleImageSearch = debounce(async (query) => {
        const result = await handleSubmit(query, token);
        setImages(result.photos)
    }, 500)


    const renderImages = () => {
        if (!!images && !!images.photo) {
            const items = images.photo.map((image, index) => {
                const src = `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`;
                return (
                        <GridListTile key={index} cols={1}>
                            <img src={src} key={index} aria-label={image.title}/>
                        </GridListTile>
                        )
            })
            return (
                <div className={classes.scrollContainer}>
                    <InfiniteScroll
                        dataLength={items.length} //This is important field to render the next data
                        hasMore={true}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{textAlign: 'center'}}>
                            <b>Yay! You have seen it all</b>
                            </p>
                        }>
                        <GridList cellHeight={160} cols={3} className={classes.gridList}>
                            {items}
                        </GridList>
                    </InfiniteScroll>
                </div>
            )
        }
    }

    return (
        <Dialog onClose={setOpen} aria-labelledby="customized-dialog-title" open={open} classes={{ paper: classes.dialog }}>
        <DialogTitle disableTypography={true} id="customized-dialog-title" className={classes.dialogTitle} onClose={setOpen}>
          <Typography variant="h5">Image Search</Typography>
          <IconButton aria-label="close" className={classes.closeButton} onClick={setOpen}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
        <ReactSearchBox 
          onChange={query => handleImageSearch(query)}
          placeholder="Type image name here"
          />
        <div className={classes.gridListContainer}>
            {renderImages()}
        </div>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={() => setIsOpen(false)} color="primary">
            Save changes
          </Button> */}
        </DialogActions>
      </Dialog>
    )
}

const mapStateToProps = state => ({
    token: state.user.get('token'),
})

export default connect(
    mapStateToProps
)(ImageSearch)
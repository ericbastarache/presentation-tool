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
import Zoom from '@material-ui/core/Zoom';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { connect } from 'react-redux';
import {debounce} from 'lodash';
import { EditorContext } from 'components/Editor/context';
import { fabric } from 'fabric';


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
        width: '600px'
    },
    scrollContainer: {
        width: '100%'
    },
    endMessage: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(2)
    },
    imageContainer: {
      overflow: 'hidden'
    },
    image: {
      cursor: 'pointer',
    }
  }));

const ImageSearch = ({open, setOpen, token}) => {
    const MAX_NUM_IMAGES = 6;
    const { canvas } = React.useContext(EditorContext);
    const [images, setImages] = useState([]);
    const [pages, setPages] = useState({currenPage: 0, pageTotal: 0});
    const [lastImageIndex, setLastImageIndex] = useState(0);
    const [imageGroup, setImageGroup] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    const [query, setQuery] = useState(null);
    const classes = useStyles();
    const { handleSubmit, getPhoto } = useImageSearch();

    const handleImageSearch = debounce(async (query) => {
        const result = await handleSubmit(query, token);
        if (result.stat === 'ok') {
          setImageGroup(result.photos.photo);
          if (result.photos.photo.length > MAX_NUM_IMAGES) {
            setImages(result.photos.photo.splice(0, 20));
            setLastImageIndex(MAX_NUM_IMAGES - 1);
            setHasMore(true)
          } else {
            setImages(result.photos.photo);
            setLastImageIndex(result.photos.photo.length);
            setHasMore(false)
          }
          setPages({currentPage: result.photos.page, pageTotal: result.photos.pages});
        }
        setQuery(query);
    }, 1000)

    const handleNext = async () => {
      if (imageGroup.length > lastImageIndex) {
        const nextImageGroupSize = lastImageIndex + MAX_NUM_IMAGES;
        const newImages = imageGroup.slice(lastImageIndex, nextImageGroupSize);
        const updatedImages = images.concat(newImages);
        setImages(updatedImages)
        setLastImageIndex(nextImageGroupSize)
      } else {
        if (pages.currentPage === pages.pageTotal) {
          setHasMore(false)
        } else {
          const nextPage = pages.currentPage + 1;
          const result = await handleSubmit(query, token, nextPage);
          if (result.stat === 'ok') {
            setImageGroup(result.photos.photo);
            if (result.photos.photo.length > MAX_NUM_IMAGES) {
              const newImages = result.photos.photo.slice(0, MAX_NUM_IMAGES);
              const updatedImages = images.concat(newImages);
              setImages(updatedImages);
              setLastImageIndex(MAX_NUM_IMAGES - 1);
              setHasMore(true)
            } 
            else {
              const updatedImages = images.concat(result.photos.photo);
              setImages(updatedImages);
              setLastImageIndex(result.photos.photo.length);
              setHasMore(false)
            }
            setPages({currentPage: result.photos.page, pageTotal: result.photos.pages});
          } 
        }
      } 
    }

    const handleClick = async (e, imageID) => {
      const result = await getPhoto(imageID, token)
      if (result.sizes && result.sizes.size) {
        const imgURL = result.sizes.size[result.sizes.size.length - 2].source
        fabric.Image.fromURL(imgURL, function(img) {
          if (img.height > canvas.height) {
            img.scaleToHeight(canvas.height)
          }
          if (img.width > canvas.width) {
            img.scaleToWidth(canvas.width)
          }
          img.set({left: 0, top: 0});
          canvas.add(img);
          canvas.renderAll();
          setOpen(false);
          canvas.fire('object:modified');
        }, {crossOrigin: 'anonymous'})
      }
    }

    const endMessage = () => {
      if (!query) {
        return (
          <Typography className={classes.endMessage} variant="h5">
            Type something to see images
          </Typography>
        )
      } else {
        return (
          <Typography className={classes.endMessage} variant="h5">
            The End. Try another search!
          </Typography>
          )
      }
    }

    const renderImages = () => {
        if (!!images) {
            const items = images.map((image, index) => {
                const src = `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}_q.jpg`;
                const original = `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}_0.jpg`;
                return (
                        <Zoom in={true} key={'zoom-'+index}>
                          <GridListTile key={'tile-'+index} cols={1}>
                              <img src={src} key={'img-'+index} aria-label={image.title} className={classes.image} onClick={(e) => handleClick(e, image.id)}/>
                          </GridListTile>
                        </Zoom>
                        )
            })
            return (
                <div className={classes.scrollContainer}>
                    <InfiniteScroll
                        dataLength={images.length} //This is important field to render the next data
                        hasMore={hasMore}
                        next={handleNext}
                        loader={<h4>Loading...</h4>}
                        scrollableTarget="scrollable-container"
                        endMessage={endMessage()}>
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
        <DialogContent dividers id="scrollable-container">
        <ReactSearchBox 
          onChange={query => handleImageSearch(query)}
          placeholder="Type image name here"
          />
        <div className={classes.gridListContainer}>
            {renderImages()}
        </div>
        </DialogContent>
        <DialogActions>
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
import React from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import ImageSearch from "components/ImageSearch";
import { connect } from "react-redux";
import { useState } from "react";

const AddImage = ({ slideCount }) => {
  const [showImageSearch, setShowImageSearch] = useState(false);

  return (
    <div>
      <Tooltip title="Search and Insert Image">
        <div>
          <IconButton
            size="small"
            onClick={() => setShowImageSearch(true)}
            disabled={!Boolean(slideCount)}
          >
            <PhotoCameraIcon />
          </IconButton>
        </div>
      </Tooltip>
      <ImageSearch
        open={showImageSearch}
        setOpen={() => setShowImageSearch(!showImageSearch)}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  slideCount: state.presentation.get("slide_count")
});

export default connect(mapStateToProps)(AddImage);

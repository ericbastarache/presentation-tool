import React from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { DropzoneDialog } from "material-ui-dropzone";
import { fabric } from "fabric";
import { connect } from "react-redux";
import { useState } from "react";

const UploadImage = ({ canvas, slideCount }) => {
  const [showImageUpload, setShowImageUpload] = useState(false);

  const addImage = images => {
    setShowImageUpload(false);
    const reader = new FileReader();
    reader.readAsDataURL(images[0]);
    reader.onload = () => {
      const imgData = reader.result;
      fabric.Image.fromURL(imgData, function(img) {
        img.left = 50;
        img.top = 50;
        if (img.height > canvas.height) {
          img.scaleToHeight(canvas.height);
        }
        if (img.width > canvas.width) {
          img.scaleToWidth(canvas.width);
        }
        canvas.add(img);
        img.bringToFront();
        canvas.renderAll();
        canvas.fire("object:modified");
      });
    };
  };

  return (
    <div>
      <Tooltip title="Upload Image">
        <div>
          <IconButton
            size="small"
            onClick={() => setShowImageUpload(true)}
            disabled={!Boolean(slideCount)}
          >
            <CloudUploadIcon />
          </IconButton>
        </div>
      </Tooltip>
      <DropzoneDialog
        onSave={addImage}
        open={showImageUpload}
        acceptedFiles={["image/jpeg", "image/png"]}
        showPreviews={true}
        maxFileSize={1000000}
        onClose={() => setShowImageUpload(false)}
        filesLimit={1}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  slideCount: state.presentation.get("slide_count")
});

export default connect(mapStateToProps)(UploadImage);

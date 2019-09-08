export const handleObjectRotating = (e) => {
    let obj = e.target;

    obj.setCoords()

    if(obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0){
        obj.top = Math.max(obj.top, obj.top-obj.getBoundingRect().top);
        obj.left = Math.max(obj.left, obj.left-obj.getBoundingRect().left);
    }
   // bot-right corner
   if(obj.getBoundingRect().top+obj.getBoundingRect().height  > obj.canvas.height || obj.getBoundingRect().left+obj.getBoundingRect().width  > obj.canvas.width){
       obj.top = Math.min(obj.top, obj.canvas.height-obj.getBoundingRect().height+obj.top-obj.getBoundingRect().top);
       obj.left = Math.min(obj.left, obj.canvas.width-obj.getBoundingRect().width+obj.left-obj.getBoundingRect().left);
   }

}


export const handleObjectMoving = (e) => {

    let obj = e.target;

    obj.setCoords();        
    // top-left  corner
    if(obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0){
        obj.top = Math.max(obj.top, obj.top-obj.getBoundingRect().top);
        obj.left = Math.max(obj.left, obj.left-obj.getBoundingRect().left);
    }
   // bot-right corner
   if(obj.getBoundingRect().top+obj.getBoundingRect().height  > obj.canvas.height || obj.getBoundingRect().left+obj.getBoundingRect().width  > obj.canvas.width){
       obj.top = Math.min(obj.top, obj.canvas.height-obj.getBoundingRect().height+obj.top-obj.getBoundingRect().top);
       obj.left = Math.min(obj.left, obj.canvas.width-obj.getBoundingRect().width+obj.left-obj.getBoundingRect().left);
   }

}

export const handleObjectScaling = (e) => {
    const obj = e.target,
        maxWidth = obj.canvas.width,
        maxHeight = obj.canvas.height,
        actualWidth = obj.scaleX * obj.width,
        actualHeight = obj.scaleY * obj.height;

    if (actualHeight >= maxHeight || actualWidth >= maxWidth) {
        const scalef = (maxHeight / obj.height) < (maxWidth / obj.width) ? (maxHeight / obj.height) : (maxWidth / obj.width);
        obj.set({
            scaleY: scalef,
            scaleX: scalef
        });
    }

    obj.setCoords();
    // top-left  corner
    if (obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0) {
        obj.top = Math.max(obj.top, obj.top - obj.getBoundingRect().top);
        obj.left = Math.max(obj.left, obj.left - obj.getBoundingRect().left);
    }
    // bot-right corner
    if (obj.getBoundingRect().top + obj.getBoundingRect().height > obj.canvas.height || obj.getBoundingRect().left + obj.getBoundingRect().width > obj.canvas.width) {
        obj.top = Math.min(obj.top, obj.canvas.height - obj.getBoundingRect().height + obj.top - obj.getBoundingRect().top);
        obj.left = Math.min(obj.left, obj.canvas.width - obj.getBoundingRect().width + obj.left - obj.getBoundingRect().left);
    }
}


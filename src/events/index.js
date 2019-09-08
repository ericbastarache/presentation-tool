import { fabric } from 'fabric';

export const handleKeyboardShortcuts = (event, canvas) => {

        switch (event.keyCode) {
            //DELETE key
            case 46:
                if (canvas.getActiveObjects().length > 0) {
                    canvas.getActiveObjects().forEach((obj) => {
                        canvas.remove(obj);
                    });
                    canvas.discardActiveObject().renderAll();
                    canvas.fire('object:modified');
                }   
                return;
            //CTRL + C key pressed
            case 67:
                //If ctrl key was being held
                if (canvas.getActiveObjects().length > 0) {
                    if (event.ctrlKey) {
                        canvas.getActiveObject().clone((cloned) => {
                            canvas.__clipboard = cloned;
                        });
                    }
                }
                return;
            //CTRL + V key pressed
            case 86: 
                if (event.ctrlKey && canvas.__clipboard) {
                    canvas.discardActiveObject();
                    let obj = canvas.__clipboard;
                    obj.set({
                        left: obj.left + 10,
                        top: obj.top + 10,
                        evented: true,
                    });
                    if (obj.type === 'activeSelection') {
                    obj.canvas = canvas;
                    obj.forEachObject(newObj => {
                        canvas.add(newObj);
                    });
                    obj.setCoords();
                    } else {
                    canvas.add(obj);
                    }
                    canvas.setActiveObject(obj);
                    canvas.getActiveObject().clone((cloned) => {
                        canvas.__clipboard = cloned;
                    });
                    canvas.requestRenderAll();
                }
                return;
            //CTRL + A
            case 65: 
                if (event.ctrlKey) {
                    event.preventDefault();
                    canvas.discardActiveObject();
                    var sel = new fabric.ActiveSelection(canvas.getObjects(), {
                      canvas: canvas,
                    });
                    canvas.setActiveObject(sel);
                    canvas.requestRenderAll();
                }
            return;
            //ArrowUp
            case 38:
            if (Array.isArray(canvas.getActiveObjects())) {
                canvas.getActiveObjects().forEach(obj => {
                    obj.top = obj.top - 1;
                    borderControl(obj);
                });
                canvas.renderAll();
            }
            //ArrowDown
            case 40: 
            if (Array.isArray(canvas.getActiveObjects())) {
                canvas.getActiveObjects().forEach(obj => {
                    obj.top = obj.top + 1;
                    borderControl(obj);
                });
                canvas.renderAll();
            }
            return;
            //ArrowLeft
            case 37: 
            if (Array.isArray(canvas.getActiveObjects())) {
                canvas.getActiveObjects().forEach(obj => {
                    obj.left = obj.left - 1;
                    borderControl(obj);
                });
                canvas.renderAll();
            }
            //ArrowRight
            case 39: 
            if (Array.isArray(canvas.getActiveObjects())) {
                canvas.getActiveObjects().forEach(obj => {
                    obj.left = obj.left + 1;
                    borderControl(obj);
                });
                canvas.renderAll();
            }
            default:
                return;
        }
}

const borderControl = (obj) => {
    obj.setCoords();

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

export const handleObjectRotating = (e) => {
    let obj = e.target;
    borderControl(obj);
}


export const handleObjectMoving = (e) => {

    let obj = e.target;
    borderControl(obj);

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


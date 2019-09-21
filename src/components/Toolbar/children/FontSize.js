import React from 'react';
import { fabric } from 'fabric';
import { connect } from 'react-redux';
import Select from 'react-select';

const customStyles = {
    placeholder: () => ({
        color: '#0d47a1'
    })
  }


const FontSize = ({canvas, slideCount}) => {
    const [showControls, setShowControls] = React.useState(false);
    const [fontSize, setFontSize] = React.useState(null);

    const handleSelection = (event) => {
        if (event.target && event.target.type === 'i-text') {
            setShowControls(true);
            setFontSize(event.target.fontSize);
        } else {
            setFontSize(null)
            setShowControls(false);
        }
    }

    const changeFontSize = (selectedOption) => {
        if (canvas.getActiveObject().type && canvas.getActiveObject().type === 'i-text') {
            canvas.getActiveObject().set('fontSize', selectedOption.value);
            setFontSize(selectedOption.value);
            canvas.fire('object:modified');
            canvas.renderAll();
        }
    }


    React.useEffect(() => {
        if (canvas) {
            canvas.on({
                'selection:cleared' : handleSelection,
                'selection:created' : handleSelection,
                'selection:updated' : handleSelection,
            })
            return () => {
                canvas.off({ 
                    'selection:cleared' : handleSelection,
                    'selection:created' : handleSelection,
                    'selection:updated' : handleSelection,
                });
            };
        }
    }, [canvas])

    return (
        <>
            <Select
                options={[...Array(121).keys()].map(num => {return {value: num, label: num}})}
                value={fontSize}
                placeholder={fontSize}
                styles={customStyles}
                isDisabled={!Boolean(showControls)}
                onChange={changeFontSize}
                isOptionSelected={(option) => (option.value == fontSize) ? true : false}
            />
        </>
    )
}

const mapStateToProps = state => ({
    slideCount : state.presentation.get('slide_count'),
})

export default connect(
    mapStateToProps
)(FontSize)
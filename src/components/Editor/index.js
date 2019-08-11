import React from 'react'
import { 
    Select,
    FormControl,
    FormHelperText,
    OutlinedInput,
    MenuItem,
    InputLabel
} from '@material-ui/core'

const Editor = () => {
    const inputLabel = React.createRef(null)
    const handleChange = () => {
      console.log('change handled')
    }
    return (
    <FormControl variant="outlined">
        <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
          Weight
        </InputLabel>
        <Select
        //   value={values.age}
          onChange={handleChange()}
          input={<OutlinedInput name="age" id="outlined-age-simple" />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    )
}

export default Editor
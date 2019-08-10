import React from 'react'
import { 
    Select,
    FormControl,
    FormHelperText,
    OutlinedInput 
} from '@material-ui/core'

const Editor = () => {
    applyEffect = () => {
        console.log('effect applied')
    }
    return (
    <FormControl variant="outlined">
        <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
          Weight
        </InputLabel>
        <Select
        //   value={values.age}
          onChange={handleChange}
          input={<OutlinedInput labelWidth={labelWidth} name="age" id="outlined-age-simple" />}
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
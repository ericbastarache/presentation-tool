import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
const SelectInput = ({value, onChange, children}) => {
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl}>
        <InputLabel htmlFor="font-size">Font Size</InputLabel>
        <Select
          value={value}
          onChange={onChange}
          inputProps={{
            name: 'font',
            id: 'font-size',
          }}
        >
          {children}
        </Select>
      </FormControl>
  )
}

export default SelectInput;
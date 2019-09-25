import React from 'react';
import TextField from '@material-ui/core/TextField';

const TextInput = (props) => {
  const {
    id,
    name,
    label,
    value,
    onChange,
    ...rest
  } = props;
  return (
    <TextField
      id={id}
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      {...rest}
    />
  )
}

export default TextInput;
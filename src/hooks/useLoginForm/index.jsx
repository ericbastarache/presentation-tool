import React from 'react';
import {
  emailValidator,
  passwordValidator
} from 'validators';

const useLoginForm = () => {
  const [inputs, setInputs] = React.useState({
    email: '',
    password: ''
  });
  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
      if (!emailValidator(inputs.email)) {
        console.log('incorrect email entered')
      }
      if (!passwordValidator(inputs.password)) {
        console.log('please enter a correct password');
      }
      // handle login logic
    }
  }
  const handleInputChange = (event) => {
    event.persist();
    setInputs(inputs => ({
      ...inputs, [event.target.name]: event.target.value
    }))
  }
  return {
    handleSubmit,
    handleInputChange,
    inputs
  }
}

export default useLoginForm;
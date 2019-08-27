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
  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
      if (!emailValidator(inputs.email)) {
        console.log('incorrect email entered')
      } else {
        const {email, password} = inputs
          const result = await fetch(`${process.env.REACT_APP_AUTH_ENDPOINT}/login`, {
              method: 'POST',
              headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  email,
                  password
              })
          }).then(res => res.json()).catch(err => {
              throw err
          })
          return result
      }
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
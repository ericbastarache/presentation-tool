import React from 'react';
import {
  emailValidator,
  passwordValidator,
  stringValidator
} from 'validators';

const useRegisterForm = () => {
  const [inputs, setInputs] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
      let validationErrors = []
      if (!emailValidator(inputs.email)) {
        validationErrors.push({email:true})
      }
      if (!passwordValidator(inputs.password)) {
        validationErrors.push({password:true})
      }
      if (!stringValidator(inputs.firstName)) {
        validationErrors.push({firstName:true})
      }
      if (!stringValidator(inputs.lastName)) {
        validationErrors.push({lastName:true})
      }
      if (validationErrors.length) {
        console.log(validationErrors)
        return
      } else {
            const {firstName, lastName, email, password} = inputs
            const result = await fetch(`${process.env.REACT_APP_AUTH_ENDPOINT}/register`, {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName,
                    lastName,
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

export default useRegisterForm;
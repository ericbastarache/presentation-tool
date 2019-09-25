export const emailValidator = (email) => {
  /* eslint-disable no-useless-escape */
  const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
}

export const passwordValidator = (password) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumeric = /\d/.test(password);
  const hasCharacters = /\W/.test(password);
  if (password.length < 8 && password.length > 16) {
    return false;
  }
  if (!hasUpperCase || !hasNumeric || !hasCharacters) {
    return false;
  }
  return true;
 }

 export const stringValidator = (string) => {
   const stringRegex = /^[a-zA-Z ]{2,30}$/;
   return stringRegex.test(string)
 }

 export default {
   emailValidator,
   passwordValidator,
 }
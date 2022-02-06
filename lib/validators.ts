export const validatePasswordConfirm = (password: string, confirmation: string) => {
  return password === confirmation && validatePassword(password);
}

export const validatePassword = (password: string) => {
  return password.length > 6;
}

export const validateEmail = (email: string) => {
  const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return String(email).match(re);
}
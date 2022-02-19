export const validatePasswordConfirm = (password: string, confirmation: string) => {
  return password === confirmation && password.length > 6 ? 'valid' : 'neutral'
}

export const validatePassword = (password: string) => {
  return password.length > 6 ? 'valid' : 'neutral'
}


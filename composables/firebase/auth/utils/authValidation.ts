export function validateCredentials(email: string, password: string) {
  if (!email || !password) {
    throw new Error('Email and password are required.');
  }
}

export function validateRepeatedPassword(password: string, repeatedPassword: string) {
  return password === repeatedPassword;
}

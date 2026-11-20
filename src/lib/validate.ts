//email validation
export const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//name

export const isValidName = (name: string) =>
  name.trim().length >= 2 && /\p{L}/u.test(name);
export const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isValidName = (name: string): boolean => {
  return /^[a-zA-Z]+$/.test(name);
};

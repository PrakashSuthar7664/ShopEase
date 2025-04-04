import bcrypt from "bcrypt";

export const hashpassword = (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

export const comparePassword = (password, hashedPassword) => {
  try {
    return bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.log(error);
  }
};

import jwt, {  sign } from "jsonwebtoken";

export const genToken = (userEmail: string, role: string) => {
  const accessToken = sign(
    { username: userEmail, role: role },
    `${process.env.ACCESS_TOKEN_SECRET}`,
    { expiresIn: "2d" },
  );
  return accessToken;
};


// export const genRefreshToken = (userEmail: string, role: string) => {
//   const refreshToken = sign(
//     { username: userEmail, role: role },
//     `${process.env.ACCESS_TOKEN_SECRET}`,
//     { expiresIn: "2d" },
//   );
//   return refreshToken;
// };


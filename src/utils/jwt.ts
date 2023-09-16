import * as jwt from "jsonwebtoken";

export const genToken = (user: {email: string, role: string}, secretKey: string) => {
  
  return jwt.sign({user}, secretKey, {expiresIn: "2d"});

};

export const verifyToken = (token: string, secretKey: string): jwt.JwtPayload =>{

  return jwt.verify(token, secretKey) as jwt.JwtPayload
}


// export const genRefreshToken = (userEmail: string, role: string) => {
//   const refreshToken = sign(
//     { username: userEmail, role: role },
//     `${process.env.ACCESS_TOKEN_SECRET}`,
//     { expiresIn: "2d" },
//   );
//   return refreshToken;
// };


import { TokenUser } from "../interface/token.user.interface";

declare global {
    namespace Express {
        export interface Request{
            user:  TokenUser | null | undefined
        }
    }
}
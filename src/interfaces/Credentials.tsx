import { User } from "./User";

export default interface Credentials {
  token: string,
  refreshToken: string,
  expires: number,
  user: User
}
export default interface IUser {
  id?: string;
  nome?: string;
  email: string;
  password?: string | null;
  //token?: string | null;
}

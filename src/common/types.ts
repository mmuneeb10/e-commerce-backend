export interface AppUser {
  id: number;
  name: string;
}

export interface AppReq extends Request {
  user: AppUser;
  route: {
    path: string;
  };
}

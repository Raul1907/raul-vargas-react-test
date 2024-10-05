
export interface User {
    id: number;
    name: string;
    role: string;
    status: string;
  }

  export interface UserAuth {
    email: string;
    password: string;
    isAuth : boolean;
    token: string
  }
export type UserType = {
  id: number;
  username: string;
  email: string;
  password: string;
  refreshToken?: string;
  roles: string[];
};

export type NoteType = {
  id: string;
  title: string;
  description: string;
};

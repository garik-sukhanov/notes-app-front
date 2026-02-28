import type { NoteType, UserType } from './index';

type ServerResponseList<T> = {
  pagination: Pagination;
  data: T[];
};

export type Pagination = {
  page: number;
  total: number;
  size: number;
};

// AUTH
export type LoginDto = {
  email: string;
  password: string;
};

export type RegisterDto = {
  email: string;
  username: string;
  password: string;
};

export type LoginResponseDto = {
  accessToken: string;
  user: UserType;
};

export type RegisterResponseDto = {
  accessToken: string;
  user: UserType;
};

// USERS
export type GetUsersResponseDto = ServerResponseList<UserType>;

// NOTES
export type GetNotesResponseDto = ServerResponseList<NoteType>;

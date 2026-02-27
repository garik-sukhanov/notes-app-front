import 'react-router-dom';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  NOTES: '/notes',
  NOTE: '/note/:spaceId',
  USERS: '/users',
} as const;

export type PathParams = {
  [ROUTES.NOTE]: {
    spaceId: string;
  };
};

declare module 'react-router-dom' {
  interface Register {
    params: PathParams;
  }
}

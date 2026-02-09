/**
 * Auth utilities
 */

import Cookies from 'js-cookie';
import { api } from './api';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export const auth = {
  setToken: (token) => Cookies.set(TOKEN_KEY, token, { expires: 7 }),
  getToken: () => Cookies.get(TOKEN_KEY),
  clearToken: () => Cookies.remove(TOKEN_KEY),

  setUser: (user) => Cookies.set(USER_KEY, JSON.stringify(user), { expires: 7 }),
  getUser: () => {
    const user = Cookies.get(USER_KEY);
    return user ? JSON.parse(user) : null;
  },
  clearUser: () => Cookies.remove(USER_KEY),

  isAuthenticated: () => !!Cookies.get(TOKEN_KEY),

  logout: () => {
    auth.clearToken();
    auth.clearUser();
  },
};

export default auth;

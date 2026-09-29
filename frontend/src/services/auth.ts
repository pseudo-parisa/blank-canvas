import api from './api';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'BUYER' | 'SELLER' | 'ADMIN';
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}

export async function register(
  name: string,
  email: string,
  password: string,
) {
  const response = await api.post('/auth/register', {
    name,
    email,
    password,
  });

  return response.data;
}

export async function login(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const response = await api.post('/auth/login', {
    email,
    password,
  });

  localStorage.setItem(
    'accessToken',
    response.data.accessToken,
  );

  return response.data;
}

export function logout() {
  localStorage.removeItem('accessToken');
}

export async function getCurrentUser(): Promise<User> {
  const response = await api.get('/auth/me');

  return response.data;
}
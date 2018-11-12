import {API_URL} from '../constants/api';


const delay = async (ms: number) => await new Promise((resolve) => setTimeout(resolve, ms));
const error = (prob: number): void => { if (Math.random() < prob) { throw new Error('artificial error'); } };

const DELAY = 1000;
const ERROR = 0.0;

export async function get<T>(path: string, token: string|null = null): Promise<T> {
  await delay(DELAY);
  error(ERROR);
  const response = await fetch(`${API_URL}${path}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}` // TODO exclude when auth is null
    }
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

export async function post<T>(path: string, body: object|null, token: string|null = null, acceptType: string): Promise<T> {
  await delay(DELAY);
  error(ERROR);
  const response = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: acceptType,
      Authorization: `Bearer ${token}` // TODO exclude when auth is null
    },
    body: JSON.stringify(body)
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

export async function put<T>(path: string, body: object|null, token: string|null = null): Promise<T> {
  await delay(DELAY);
  error(ERROR);
  const response = await fetch(`${API_URL}${path}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}` // TODO exclude when auth is null
    },
    body: JSON.stringify(body)
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

export async function del(path: string, body: object|null, token: string|null = null): Promise<void> {
  await delay(DELAY);
  error(ERROR);
  const response = await fetch(`${API_URL}${path}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}` // TODO exclude when auth is null
    },
    body: JSON.stringify(body)
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
}

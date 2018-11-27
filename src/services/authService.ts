import {IAuth} from '../models/chat/IAuth';
import * as _ from 'lodash';
import {withArtificialError, withDelay, withErrorHandler, withHeader, withRebasedUrl} from './fetchDecorators';
import {API_URL} from '../constants/api';
import {ICredentials} from '../models/chat/ICredentials';

export interface IAuthService {
  login: (credentials: ICredentials) => Promise<void>;
  logout: () => Promise<void>;
  getToken: () => Promise<string>;
}


const STORAGE_KEY = 'auth';

// TODO: Need to put async because of Promises in interface. Probably should not be there.

const storeAuth = async (auth: IAuth): Promise<void> => localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));

const obtainAuth = async (): Promise<IAuth> => {
  const auth = localStorage.getItem(STORAGE_KEY);
  if (!auth) {
    throw new AuthError('Can`t obtain auth from local storage. It is not present.');
  }
  return JSON.parse(auth);
};

const deleteAuth = async (): Promise<void> => localStorage.removeItem(STORAGE_KEY);

const delay = 1000;
const errorProb = 0.0;

const apiFetch = _.flowRight(
  withRebasedUrl(API_URL),
  withHeader('Accept', 'application/json'),
  withHeader('Content-type', 'application/json'),
  withErrorHandler(),
  withArtificialError(errorProb),
  withDelay(delay),
)(fetch);

export class AuthError extends Error {}

export const authService: IAuthService = {
  login: async (credentials) => {
    const resp = await apiFetch('/auth', {method: 'POST', body: JSON.stringify(credentials)});
    const auth = await resp.json();
    storeAuth(auth);
  },
  logout: deleteAuth,
  getToken: async () => (await obtainAuth()).token
};

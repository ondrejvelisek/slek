import {IAuthState} from '../states/chat/IAuthState';

export interface IPersistedState {
  chat: {
    auth: IAuthState;
  };
}

const STORAGE_KEY = 'persisted_state';

export const loadState = (): IPersistedState|undefined => {
  try {
    const state = localStorage.getItem(STORAGE_KEY);
    if (!state) {
      return undefined;
    }
    return JSON.parse(state);
  } catch (e) {
    return undefined;
  }
};

export const saveState = (state: IPersistedState): void => {
  try {
    return localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.log('Unable to save state. Incognito/Privacy window?');
  }
};

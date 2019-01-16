import {IAuthState} from '../states/chat/IAuthState';

export interface IPersistedState {
  chat: {
    auth: IAuthState;
  };
}

const STORAGE_KEY = 'persisted_state';


export const createPersistService = (storage: Storage) => ({

  loadState: (): IPersistedState|undefined => {
    try {
      const state = storage.getItem(STORAGE_KEY);
      if (!state) {
        return undefined;
      }
      return JSON.parse(state);
    } catch (e) {
      return undefined;
    }
  },

  saveState: (state: IPersistedState): void => {
    try {
      return storage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.log('Unable to save state. Incognito/Privacy window?', e);
    }
  }

});


import {
  SLEK_ACCOUNT_GETTING_STARTED,
  SLEK_ACCOUNT_GETTING_FAILED,
  SLEK_ACCOUNT_GETTING_SUCCEEDED,
  SLEK_ACCOUNTS_GETTING_STARTED,
  SLEK_ACCOUNTS_GETTING_FAILED,
  SLEK_ACCOUNTS_GETTING_SUCCEEDED,
  SLEK_ACCOUNT_AUTHORIZATION_FAILED,
  SLEK_ACCOUNT_UPDATE_STARTED,
  SLEK_ACCOUNT_UPDATE_SUCCEEDED,
  SLEK_ACCOUNT_UPDATE_FAILED,
  SLEK_AVATAR_UPDATE_STARTED,
  SLEK_AVATAR_UPDATE_SUCCEEDED,
  SLEK_AVATAR_UPDATE_FAILED
} from '../../constants/actions';
import {IAccount} from '../../models/chat/IAccount';
import * as Immutable from 'immutable';
import {ThunkAction} from 'redux-thunk';
import {IRootState} from '../../states/IRootState';
import {IServices} from '../../services';
import {HttpError} from '../../services/fetchDecorators';
import {selectAuthAccount} from '../../selectors/chat';

const accountGettingStarted = (email: string): Action => ({
  type: SLEK_ACCOUNT_GETTING_STARTED,
  payload: email
});

const accountGettingSucceeded = (email: string, account: IAccount|null): Action => ({
  type: SLEK_ACCOUNT_GETTING_SUCCEEDED,
  payload: {
    email,
    account
  }
});

const accountGettingFailed = (email: string): Action => ({
  type: SLEK_ACCOUNT_GETTING_FAILED,
  payload: email
});

export const getAccount = (email: string): ThunkAction<void, IRootState, IServices, Action> =>
  async (dispatch, _, {chatService}) => {
    try {
      dispatch(accountGettingStarted(email));
      const account = await chatService.getUser(email);
      dispatch(accountGettingSucceeded(email, account));
    } catch (e) {
      dispatch(accountGettingFailed(email));
    }
  };

const authorizationFailed = (email: string): Action => ({
  type: SLEK_ACCOUNT_AUTHORIZATION_FAILED,
  payload: email
});

export const authorizeAccount = (email: string): ThunkAction<void, IRootState, IServices, Action> =>
  async (dispatch, _, {chatService}) => {
    try {
      dispatch(accountGettingStarted(email));
      const account = await chatService.getUser(email);
      dispatch(accountGettingSucceeded(email, account));
    } catch (e) {
      if (e instanceof HttpError && e.code === 404) {
        dispatch(authorizationFailed(email));
      } else {
        dispatch(accountGettingFailed(email));
      }
    }
  };


const avatarUploadingStarted = (email: string, tempUrl: string): Action => ({
  type: SLEK_AVATAR_UPDATE_STARTED,
  payload: {
    tempUrl,
    email
  }
});

const avatarUploadingSucceeded = (account: IAccount): Action => ({
  type: SLEK_AVATAR_UPDATE_SUCCEEDED,
  payload: {
    account
  }
});

const avatarUploadingFailed = (): Action => ({
  type: SLEK_AVATAR_UPDATE_FAILED,
  payload: {}
});

export const updateAvatar = (file: File): ThunkAction<void, IRootState, IServices, Action> =>
  async (dispatch, getState, {chatService}) => {
    try {
      const account = selectAuthAccount(getState()).content;
      if (!account) {
        throw new Error('Updating avatar without active account');
      }
      const tempUrl = await readAsDataURL(file);
      dispatch(avatarUploadingStarted(account.email, tempUrl));
      const metadata = await chatService.uploadFile(file);
      const fileUrl = await chatService.getFileLink(metadata.id);
      const updated = await chatService.updateUser({
        ...account,
        avatar: fileUrl
      });
      dispatch(avatarUploadingSucceeded(updated));
    } catch (e) {
      dispatch(avatarUploadingFailed());
    }
  };

function readAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string|null|undefined;
      if (!dataUrl) {
        reject(dataUrl);
      } else {
        resolve(dataUrl);
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// export const getActiveAccount = (): ThunkAction<void, IRootState, IServices, Action> =>
//   async (dispatch, getState, {chatService}) => {
//     const auth = getState().chat.auth.content;
//     if (!auth) {
//       // TODO should dispatch something
//       return;
//     }
//     try {
//       dispatch(accountGettingStarted(auth.email));
//       const account = await chatService.getUser(auth.email);
//       dispatch(accountGettingSucceeded(auth.email, account));
//     } catch (e) {
//       if (e instanceof HttpError) {
//         if (e.code === 404) {
//           dispatch(accountGettingSucceeded(auth.email, null));
//         }
//       } else {
//         dispatch(accountGettingFailed(auth.email));
//       }
//     }
//   };

const accountsGettingStarted = (): Action => ({
  type: SLEK_ACCOUNTS_GETTING_STARTED,
});

const accountsGettingSucceeded = (accounts: Immutable.List<IAccount>): Action => ({
  type: SLEK_ACCOUNTS_GETTING_SUCCEEDED,
  payload: accounts
});

const accountsGettingFailed = (): Action => ({
  type: SLEK_ACCOUNTS_GETTING_FAILED
});

export const getAccounts = (): ThunkAction<void, IRootState, IServices, Action> =>
  async (dispatch, _, {chatService}) => {
    try {
      dispatch(accountsGettingStarted());
      const accounts = await chatService.getUsers();
      dispatch(accountsGettingSucceeded(accounts));
    } catch (e) {
      dispatch(accountsGettingFailed());
    }
  };

const updateAccountStarted = (): Action => ({
  type: SLEK_ACCOUNT_UPDATE_STARTED,
});

const updateAccountSucceeded = (account: IAccount): Action => ({
  type: SLEK_ACCOUNT_UPDATE_SUCCEEDED,
  payload: account
});

const updateAccountFailed = (): Action => ({
  type: SLEK_ACCOUNT_UPDATE_FAILED
});

export const updateAccount = (user: IAccount): ThunkAction<void, IRootState, IServices, Action> =>
  async (dispatch, _, {chatService}) => {
    try {
      dispatch(updateAccountStarted());
      const account = await chatService.updateUser(user);
      dispatch(updateAccountSucceeded(account));
    } catch (e) {
      dispatch(updateAccountFailed());
    }
  };

import {SLEK_LOGIN_STARTED, SLEK_LOGIN_FAILED, SLEK_LOGIN_SUCCEEDED, SLEK_LOGOUT} from '../../constants/actions';
import {IAuthState} from '../../states/chat/IAuthState';

export const auth = (state: IAuthState = {
                           isLoading: false,
                           error: null,
                           content: null
                         },
                     action: Action): IAuthState => {
  switch (action.type) {
    case SLEK_LOGIN_STARTED:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case SLEK_LOGIN_SUCCEEDED:
      return {
        ...state,
        isLoading: false,
        error: null,
        content: action.payload
      };
    case SLEK_LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    case SLEK_LOGOUT:
      return {
        ...state,
        isLoading: false,
        error: null,
        content: null
      };
    default:
      return state;
  }
};


import {SLEK_LOGIN, SLEK_LOGIN_FAILURE, SLEK_LOGIN_SUCCESS, SLEK_LOGOUT, SLEK_LOGOUT_FAILURE, SLEK_LOGOUT_SUCCESS} from '../../constants/actions';
import {IAuthState} from '../../states/chat/IAuthState';

export const auth = (state: IAuthState = {
                           isLoading: false,
                           error: null,
                           content: null
                         },
                     action: Action): IAuthState => {
  switch (action.type) {
    case SLEK_LOGIN:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case SLEK_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        content: action.payload
      };
    case SLEK_LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    case SLEK_LOGOUT:
      return {
        ...state,
        isLoading: true,
        error: null,
        content: action.payload
      };
    case SLEK_LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        content: action.payload
      };
    case SLEK_LOGOUT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    default:
      return state;
  }
};


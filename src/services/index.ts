import {createService, IChatService} from './chatService';
import {authService, IAuthService} from './authService';

export interface IServices {
  readonly chatService: IChatService;
  readonly authService: IAuthService;
}

export const services: IServices = {
  authService,
  chatService: createService(authService)
};

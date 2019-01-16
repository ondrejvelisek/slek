// import {createChatService} from './chatService';

describe('Chat service', () => {

  // TODO: fetch could be injected, but Request/Response objects hardly. Throws: ReferenceError: Request is not defined
  test('getUsers', async () => {
  //   const account = {
  //     email: 'ondrejvelisek@gmail.com',
  //     name: 'Ondrej Velisek',
  //     avatar: 'https://a.wattpad.com/cover/105874670-288-k79078.jpg',
  //     channelOrder: []
  //   };
  //   const auth = {
  //     email: 'ondrejvelisek@gmail.com',
  //     token: 'ABC_artificial_token_123',
  //     expiration: 'artificial_expiration'
  //   };
  //   const fetch = jest.fn().mockImplementation(() => Promise.resolve({
  //     json: async () => ([{ email: account.email, customData: account }])
  //   }));
  //
  //   const getAuth = jest.fn();
  //   getAuth.mockReturnValue(auth);
  //   const chatService = createChatService(fetch, getAuth);
  //
  //   const users = await chatService.getUsers();
  //
  //   expect(users).toEqual([account]);
  });

});

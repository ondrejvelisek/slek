import {createPersistService} from './persistService';

describe('Persist service', () => {

  test('Save and load', async () => {
    const auth = {
      email: 'ondrejvelisek@gmail.com',
      token: 'ABC_artificial_token_123',
      expiration: 'artificial_expiration'
    };
    const authState = {
      chat: {
        auth: {
          isLoading: false,
          error: null,
          content: auth
        }
      }
    };
    const map: any = {};
    const storageMock: Storage = {
      length: 0,
      clear: jest.fn(),
      setItem: jest.fn().mockImplementation((key: string, val: string) => map[key] = val),
      getItem: jest.fn().mockImplementation((key: string) => map[key]),
      key: jest.fn(),
      removeItem: jest.fn()
    };

    const persistService = createPersistService(storageMock);

    persistService.saveState(authState);

    const loadedState = persistService.loadState();

    console.log(loadedState);
    console.log(authState);
    console.log(map);

    expect(loadedState).toEqual(authState);
  });

});

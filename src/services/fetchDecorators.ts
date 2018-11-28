import * as _ from 'lodash';
import {GetAuth} from './chatService';

export type Fetch = (input: RequestInfo, init?: RequestInit) => Promise<Response>;
type Decorator<D> = (decorated: D) => D;
export type FetchDecorator = Decorator<Fetch>;

export interface ErrorHandler<R> {
  isError: (request: Request, response: R) => boolean;
  handle: (request: Request, response: R, retry: Fetch) => Promise<R>;
}



export const identity: FetchDecorator = fetch => fetch;



export const withArtificialError = (probability: number): FetchDecorator => fetch => async (input, init) => {
  error(probability);
  return await fetch(input, init);
};

const error = (prob: number): void => { if (Math.random() < prob) { throw new Error('artificial error'); } };



export const withDelay = (delay: number): FetchDecorator => fetch => async (input, init) => {
  await sleep(delay);
  return await fetch(input, init);
};

const sleep = async (ms: number) => await new Promise((resolve) => setTimeout(resolve, ms));



export const withHeader = (header: string, value: string): FetchDecorator => fetch => async (input, init) => {
  const requestWithHeader = new Request(input);
  requestWithHeader.headers.set(header, value);
  return await fetch(requestWithHeader, init);
};



export const withErrorHandler = (handler: ErrorHandler<Response> = defaultErrorHandler): FetchDecorator => fetch => async (input, init) => {
  const request = new Request(input);
  const response = await fetch(request, init);
  if (handler.isError(request, response)) {
    return await handler.handle(request, response, fetch);
  }
  return response;
};

const defaultErrorHandler: ErrorHandler<Response> = {
  isError: (_ignore, response) => !response.ok,
  handle: (request, response) => {
    throw new Error(`${response.status} ${response.statusText}, While fetching ${request.method} ${request.url}`);
  }
};



export const withAuth = (getAuth: GetAuth): FetchDecorator => fetch => async (input, init) => {
  const auth = await getAuth();
  if (!auth) {
    return fetch(input, init);
  }
  return withHeader('Authorization', `Bearer ${auth.token}`)(fetch)(input, init);
};



export const withRebasedUrl = (base: string): FetchDecorator => fetch => async (input, init) => {
  const request = new Request(input);
  const orig = new URL(request.url);
  const url = new URL(base);
  url.pathname = url.pathname + orig.pathname;
  url.search = orig.search;
  url.hash = orig.hash;
  return await fetch(new Request(url.href, request), init);
};



export const withBody = (body: string): FetchDecorator => fetch => (input, init) => {
  return fetch(input, _.extend(init, {body}));
};

export const withJsonBody = <B>(body: B): FetchDecorator => _.flow(
  withBody(JSON.stringify(body)),
  withHeader('Content-Type', 'application/json')
);


export const get: FetchDecorator = fetch => (input, init) => fetch(input, _.extend(init, {method: 'GET'}));

export const post: FetchDecorator = fetch => (input, init) => fetch(input, _.extend(init, {method: 'POST'}));

export const put: FetchDecorator = fetch => (input, init) => fetch(input, _.extend(init, {method: 'PUT'}));

export const del: FetchDecorator = fetch => (input, init) => fetch(input, _.extend(init, {method: 'DELETE'}));



export const withLogger = (message: string): FetchDecorator => fetch => async (input, init) => {
  console.log('BEFORE', message, input, init);
  const resp = await fetch(input, init);
  console.log('AFTER', message);
  return resp;
};

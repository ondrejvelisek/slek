import {Fetch, withHeader} from './fetchDecorators';

export type Parser<R> = (resp: any) => R;
export type Extractor<R> = (fetch: Fetch) => (input: RequestInfo, init?: RequestInit) => Promise<R>;

// parsers

export const identityParser: Parser<any> = resp => resp;

export const stringParser: Parser<string> = resp => JSON.stringify(resp);

export const parseResp = <R>(parser: Parser<R> = identityParser): Extractor<R> => fetch => async (input, init) => {
  const resp = await withHeader('Accept', 'application/json')(fetch)(input, init);
  return parser(await resp.json());
};

export const withoutResp: Extractor<void> = (fetch) => async (input, init) => {
  await fetch(input, init);
  return;
};

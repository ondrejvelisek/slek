export interface ILoadable<T> {
  readonly isLoading: boolean;
  readonly error: any;
  readonly content: T;
}

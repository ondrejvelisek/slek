import * as Immutable from 'immutable';

export interface IActivableMap<K, V> {
  readonly active: K | null;
  readonly content: Immutable.Map<K, V>;
}

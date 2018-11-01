import * as React from 'react';
import '../../less/chat/Loader.less';
import {
  Progress
} from 'reactstrap';

export interface ILoaderProps {}

export interface ILoaderActions {}

export class Loader extends React.PureComponent<ILoaderProps & ILoaderActions> {
  render(): JSX.Element {
    return (
      <div className="loader">
        <Progress animated value={100}/>
      </div>
    );
  }
}

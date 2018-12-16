import * as React from 'react';
import '../../less/chat/Protected.less';
import {Redirect} from 'react-router';
import {ILoadable} from '../../states/common/ILoadable';
import {Loader} from './Loader';

export interface IProtectedProps extends ILoadable<boolean> {
  email: string|null;
}

export interface IProtectedActions {
  onMounted: (email: string) => void;
}

export class Protected extends React.PureComponent<IProtectedProps & IProtectedActions> {
  componentDidMount() {
    if (this.props.email && !this.props.content && !this.props.isLoading) {
      this.props.onMounted(this.props.email);
    }
  }

  render(): JSX.Element {
    const { isLoading, error, content } = this.props;
    console.log(content);
    if (isLoading && !content) {
      return <div className="protected"><Loader/></div>;
    }
    if (error) {
      return <div>Error while authorization</div>;
    }
    if (!content) {
      return <Redirect to="/login"/>;
    }
    return (<>{this.props.children}</>);
  }
}

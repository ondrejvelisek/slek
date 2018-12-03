import * as React from 'react';
import '../../less/chat/NewChannel.less';
import {Form, Input, InputGroup, ListGroupItem} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {IActiveAccountOwnProps} from '../../containers/chat/ActiveAccount';

export interface INewChannelActions {
  onChannelAdd: (channelName: string, activeEmail: string) => void;
}

interface INewChannelState {
  value: string;
  isCreating: boolean;
}

export class NewChannel extends React.PureComponent<IActiveAccountOwnProps & INewChannelActions, INewChannelState> {
  constructor(props: IActiveAccountOwnProps & INewChannelActions) {
    super(props);

    this.state = {
      value: '',
      isCreating: false
    };
  }

  private onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    this.props.onChannelAdd(this.state.value, this.props.email);

    this.setState(_ => ({
      value: '',
      isCreating: false
    }));
  };

  private onValueChanged = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    this.setState(_ => ({ value }));
  };

  private addChannel = (): void => {
    this.setState(_ => ({
      isCreating: true
    }));
  };

  private getAddButton = (): JSX.Element => {
    return (
      <ListGroupItem className="clickable" onClick={this.addChannel}>
        <FontAwesomeIcon icon={faPlus}/>
        <span> Add</span>
      </ListGroupItem>
    );
  };

  private getForm = (): JSX.Element => {
    return (
      <Form onSubmit={this.onSubmit} className="form-inline">
        <InputGroup className="input-group">
          <Input
            id="new-channel"
            value={this.state.value}
            onChange={this.onValueChanged}
            className="form-control"
            placeholder="Channel name"
          />
        </InputGroup>
      </Form>
    );
  };

  render() {
    return (
      <div className="newChannel">
        {this.state.isCreating
          ? this.getForm()
          : this.getAddButton()
        }
      </div>
    );
  }
}

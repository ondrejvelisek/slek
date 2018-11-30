import * as React from 'react';
import * as Immutable from 'immutable';
import {IChannelData} from '../../models/chat/IChannelData';
import '../../less/chat/NewChannel.less';
import {Form, Input, InputGroup, ListGroupItem} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

export interface INewChannelActions {
  readonly onChannelAdd: (channelData: IChannelData) => void;
}

interface INewChannelState extends IChannelData {
  isCreating: boolean;
}

export class NewChannel extends React.PureComponent<INewChannelActions, INewChannelState> {
  constructor(props: INewChannelActions) {
    super(props);

    this.state = {
      name: '',
      unread: 0,
      accountEmails: Immutable.Set(),
      isCreating: false
    };
  }

  private onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    this.props.onChannelAdd(this.state);

    this.setState(_ => ({
      name: '',
      isCreating: false
    }));
  };

  private onValueChanged = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    console.log(event.currentTarget)
    this.setState(_ => ({ name: value }));
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
            value={this.state.name}
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

import * as React from 'react';
import '../../less/chat/NewChannel.less';
import {Form, Input, InputGroup, ListGroupItem} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

export interface INewChannelProps {}

export interface INewChannelActions {
  onChannelAdd: (channelName: string) => void;
}

interface INewChannelState {
  value: string;
  isCreating: boolean;
}

export class NewChannel extends React.PureComponent<INewChannelProps & INewChannelActions, INewChannelState> {
  public readonly componentRef: React.RefObject<HTMLDivElement>;
  constructor(props: INewChannelActions) {
    super(props);
    this.componentRef = React.createRef();

    this.state = {
      value: '',
      isCreating: false
    };
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.onAnyClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.onAnyClick);
  }

  private onAnyClick = (event: MouseEvent) => {
    if (this.componentRef.current && event.target instanceof Element && !this.componentRef.current.contains(event.target)) {
      // outside component click
      this.setState(_ => ({
        value: '',
        isCreating: false
      }));
    }
  };

  private onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    this.props.onChannelAdd(this.state.value);

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

  private renderAddButton = (): JSX.Element => {
    return (
      <ListGroupItem className="clickable" onClick={this.addChannel}>
        <FontAwesomeIcon icon={faPlus}/>
        <span> Add</span>
      </ListGroupItem>
    );
  };

  private renderForm = (): JSX.Element => {
    return (
      <Form onSubmit={this.onSubmit} className="form-inline">
        <InputGroup className="input-group">
          <Input
            id="new-channel"
            value={this.state.value}
            onChange={this.onValueChanged}
            className="form-control"
            placeholder="Channel name"
            autoFocus
          />
        </InputGroup>
      </Form>
    );
  };

  render() {
    return (
      <div ref={this.componentRef} className="newChannel">
        {this.state.isCreating
          ? this.renderForm()
          : this.renderAddButton()
        }
      </div>
    );
  }
}

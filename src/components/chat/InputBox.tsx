import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSmile, faImage
} from '@fortawesome/free-solid-svg-icons';
import '../../less/chat/InputBox.less';
import {
  Button, Form, Input, InputGroup, InputGroupAddon, Navbar
} from 'reactstrap';
import {ChangeEvent, FormEvent} from 'react';

export interface IInputBoxProps {}

export interface IInputBoxActions {
  onMessageSubmit: (text: string) => void;
}

export interface IInputBoxOwnState {
  readonly text: string;
}

export class InputBox extends React.PureComponent<IInputBoxProps & IInputBoxActions, IInputBoxOwnState> {
  constructor(props: IInputBoxProps & IInputBoxActions) {
    super(props);

    this.state = {
      text: ''
    };
  }

  onEmojiButtonClick = () => {
    this.setState(state => ({...state, text: `${state.text}\u{1F642}`}));
  };

  onMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    this.setState(state => ({...state, text}));
  };

  onMessageSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (this.state.text.trim().length > 0) {
      this.props.onMessageSubmit(this.state.text);
      this.setState(state => ({...state, text: ''}));
    }
  };

  render(): JSX.Element {
    return (
        <Navbar className="input-box">
        <Form onSubmit={this.onMessageSubmit}>
          <InputGroup>
            <Input onChange={this.onMessageChange} value={this.state.text}/>
            <InputGroupAddon addonType="append">
              <Button outline color="secondary" onClick={this.onEmojiButtonClick}>
                <FontAwesomeIcon icon={faSmile}/>
              </Button>
            </InputGroupAddon>
            <InputGroupAddon addonType="append">
              <Button outline color="secondary">
                <FontAwesomeIcon icon={faImage}/>
              </Button>
            </InputGroupAddon>
            <InputGroupAddon addonType="append">
              <Button outline color="secondary">
                Send
              </Button>
            </InputGroupAddon>
            </InputGroup>
        </Form>
      </Navbar>
    );
  }
}

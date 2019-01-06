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
  onFileUpload: (file: File) => void;
}

export interface IInputBoxOwnState {
  readonly text: string;
  readonly file: string;
}

export class InputBox extends React.PureComponent<IInputBoxProps & IInputBoxActions, IInputBoxOwnState> {
  constructor(props: IInputBoxProps & IInputBoxActions) {
    super(props);

    this.state = {
      text: '',
      file: ''
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

  onFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value && event.target.files && event.target.files.length > 0) {
      this.props.onFileUpload(event.target.files[0]);
      this.setState(state => ({...state, file: ''}));
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
              <label htmlFor="fileUpload" className="file-upload btn btn-secondary">
                <FontAwesomeIcon icon={faImage}/>
                <input id="fileUpload" type="file" onChange={this.onFileUpload} value={this.state.file}/>
              </label>
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

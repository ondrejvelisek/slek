import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSmile, faImage
} from '@fortawesome/free-solid-svg-icons';
import '../../less/chat/InputBox.less';
import {
  Button, Input, InputGroup, InputGroupAddon, Navbar
} from 'reactstrap';

export class InputBox extends React.PureComponent {
  render(): JSX.Element {
    return (
      <Navbar className="input-box">
        <InputGroup>
          <Input />
          <InputGroupAddon addonType="append">
            <Button outline color="secondary">
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
      </Navbar>
    );
  }
}
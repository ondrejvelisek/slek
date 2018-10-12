import React from 'react';
import {
  Media
} from 'reactstrap';
import '../less/Messages.less';

import * as _ from "lodash";
import Message from "./Message";
import Avatar from "./Avatar";
import state from "./state";

export default class Messages extends React.PureComponent {
  render() {
    return (
      <Media list className="messages">
        {
          _.map(state.messages.content, (message, id) => {
            if (state.account.content.id === message.accountId) {
              return (
                <Media key={id} tag="li" className="text-right">
                  <Media body>
                    <Message mine text={message.text}/>
                  </Media>
                </Media>
              );
            }
            return (
              <Media key={id} tag="li">
                <Avatar object className="avatar align-self-end" image={state.accounts[message.accountId].content.avatar}/>
                <Media body>
                  <Message text={message.text}/>
                </Media>
              </Media>
            );
          })
        }
      </Media>
    );
  }
}

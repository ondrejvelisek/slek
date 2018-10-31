import * as React from 'react';
// import * as _ from 'lodash';
import { Media } from 'reactstrap';
import '../../less/chat/Messages.less';
import { Message } from './Message';
import { state } from './state';
import { Avatar } from './Avatar';
import { IMessage } from '../../models/chat/IMessage';
import { IAccountState } from '../../states/chat/IChat';

export class Messages extends React.PureComponent {
  render(): JSX.Element {
    return (
      <Media list className="messages">
        {
          state.messagesState.messages.content.map((message: IMessage) => {
            if (state.account === message.accountId) {
              return (
                <Media key={message.id} tag="li" className="text-right">
                  <Media body>
                    <Message mine text={message.text}/>
                  </Media>
                </Media>
              );
            }
            const account = state.accountsState.find((a: IAccountState) => a.content.id === message.accountId);
            let imageUrl = '';
            if (account) {
              imageUrl = account.content.avatar;
            }
            return (
              <Media key={message.id} tag="li">
                <Avatar className="avatar align-self-end" image={imageUrl}/>
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

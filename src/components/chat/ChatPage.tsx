import * as React from 'react';
import {Header} from './Header';
import {InputBox} from './InputBox';
import {Messages} from './Messages';
import {ChannelsContainer} from '../../containers/chat/Channels';
import {state} from './state';
import { IAccount } from '../../models/chat/IAccount';
import '../../less/chat/ChatPage.less';

export class ChatPage extends React.PureComponent {
  constructor(props: IAccount) {
    super(props);
  }
  render(): JSX.Element {
    const account  = state.accountsState.get(state.account);
    return (

      <div className="h-100 d-flex flex-column">

        <div className="header">
          <Header avatar={account.content.avatar} name={account.content.name}/>
        </div>

        <div className="flex-grow-1 d-flex flex-column flex-md-row">

          <div className="sidebar">
            <ChannelsContainer active={state.channelsState.active} channels={state.channelsState.channels}/>
          </div>

          <div className="d-flex flex-grow-1 flex-column">

            <div className="content flex-grow-1">
              <Messages/>
            </div>

            <div className="footer">
              <InputBox/>
            </div>

          </div>

        </div>

      </div>
    );
  }
}

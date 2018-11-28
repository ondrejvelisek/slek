import { connect } from 'react-redux';
import {IRootState} from '../../states/IRootState';
import {Chat, IChatProps} from '../../components/chat/Chat';
import {selectActiveChannelId} from '../../selectors/chat';

const mapStateToProps = (state: IRootState): IChatProps => ({
  channelId: selectActiveChannelId(state)
});

export const ChatContainer = connect(mapStateToProps)(Chat);

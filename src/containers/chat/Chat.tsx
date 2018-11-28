import { connect } from 'react-redux';
import {IRootState} from '../../states/IRootState';
import {Chat, IChatProps} from '../../components/chat/Chat';

const mapStateToProps = (state: IRootState): IChatProps => ({
  channelId: state.chat.channels.active
});

export const ChatContainer = connect(mapStateToProps)(Chat);

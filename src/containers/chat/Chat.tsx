import { connect } from 'react-redux';
import {IRootState} from '../../states/IRootState';
import {Chat, IChatProps} from '../../components/chat/Chat';

const mapStateToProps = (state: IRootState): IChatProps => {
  return {
    isLoading: state.chat.auth.isLoading,
    error: state.chat.auth.error,
    content: state.chat.auth.content
  };
};

export const ChatContainer = connect<IChatProps>(mapStateToProps)(Chat);

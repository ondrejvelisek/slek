import { connect } from 'react-redux';
import {IRootState} from '../../states/IRootState';
import {IMessagesActions, IMessagesProps, Messages} from '../../components/chat/Messages';
import {selectMessageIds} from '../../selectors/chat';
import {getMessages} from '../../actions/chat/Messages';
import {getAccounts} from '../../actions/chat/Accounts';

const mapStateToProps = (state: IRootState): IMessagesProps => ({
  isLoading: state.chat.messages.isLoading,
  error: state.chat.messages.error,
  content: selectMessageIds(state),
});

const mapDispatchToProps: IMessagesActions = {
  onMessagesTrigger: getMessages,
  onMounted: getAccounts
};

export const MessagesContainer = connect(mapStateToProps, mapDispatchToProps)(Messages);

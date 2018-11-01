import { connect } from 'react-redux';
import {IRootState} from '../../states/IRootState';
import {IMessagesActions, IMessagesProps, Messages} from '../../components/chat/Messages';
import {selectMessagesKeys} from '../../selectors/chat';

const mapStateToProps = (state: IRootState): IMessagesProps => ({
  isLoading: state.chat.messages.isLoading,
  error: state.chat.messages.error,
  content: selectMessagesKeys(state)
});

const mapDispatchToProps: IMessagesActions = {};

export const MessagesContainer = connect(mapStateToProps, mapDispatchToProps)(Messages);

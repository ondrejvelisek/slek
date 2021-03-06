import { connect } from 'react-redux';
import {IRootState} from '../../states/IRootState';
import {IHasId} from '../../models/chat/IHasId';
import {IMessageActions, IMessageProps, Message} from '../../components/chat/Message';
import {selectAuthEmail, selectAuthState, selectMessagesMap} from '../../selectors/chat';
import {deleteMessage, voteMessageDown, voteMessageUp} from '../../actions/chat/Messages';

interface IMessageOwnProps extends IHasId {}

const mapStateToProps = (state: IRootState, ownProps: IMessageOwnProps): IMessageProps => ({
  ...selectMessagesMap(state).get(ownProps.id),
  mine: selectAuthState(state).content ? selectAuthEmail(state).content === selectMessagesMap(state).get(ownProps.id).createdBy : false,
});

const mapDispatchToProps: IMessageActions = {
  onVoteUp: voteMessageUp,
  onVoteDown: voteMessageDown,
  onDelete: deleteMessage
};

export const MessageContainer = connect(mapStateToProps, mapDispatchToProps)(Message);

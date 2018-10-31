import { connect } from 'react-redux';
import {IRootState} from '../../states/IRootState';
import {IHasId} from '../../models/chat/IHasId';
import {IMessageProps, Message} from '../../components/chat/Message';

interface IMessageOwnProps extends IHasId {}

const mapStateToProps = (state: IRootState, ownProps: IMessageOwnProps): IMessageProps => ({
  ...state.chat.messages.content.get(ownProps.id),
  mine: state.chat.accounts.active === state.chat.messages.content.get(ownProps.id).accountId,
});

export const MessageContainer = connect(mapStateToProps)(Message);

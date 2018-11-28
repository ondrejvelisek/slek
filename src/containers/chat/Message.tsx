import { connect } from 'react-redux';
import {IRootState} from '../../states/IRootState';
import {IHasId} from '../../models/chat/IHasId';
import {IMessageProps, Message} from '../../components/chat/Message';
import {selectAuthEmail, selectAuthState, selectMessagesMap} from '../../selectors/chat';

interface IMessageOwnProps extends IHasId {}

const mapStateToProps = (state: IRootState, ownProps: IMessageOwnProps): IMessageProps => ({
  ...selectMessagesMap(state).get(ownProps.id),
  mine: selectAuthState(state).content ? selectAuthEmail(state).content === selectMessagesMap(state).get(ownProps.id).accountEmail : false,
});

export const MessageContainer = connect(mapStateToProps)(Message);
